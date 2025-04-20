from flask import Flask,render_template,request,flash,redirect,url_for,jsonify,session
import os
import subprocess
import uuid
import requests
import json 
from flask_mysqldb import MySQL
from werkzeug.utils import secure_filename
from functools import wraps
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS  # 导入 CORS 模块

current_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(current_dir)

pingpong = Flask(__name__, static_url_path='/static', static_folder='static')
pingpong.secret_key = '121212'

# 配置 CORS，允许所有来源访问
CORS(pingpong, origins=["http://localhost:5173"])

# 处理图片的配置
UPLOAD_FOLDER = 'static/uploads'
PROCESSED_FOLDER = 'static/processed'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mp4', 'avi', 'mov'}

pingpong.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
pingpong.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
# MySQL配置
pingpong.config['MYSQL_HOST'] = 'localhost'
pingpong.config['MYSQL_USER'] = 'root'
pingpong.config['MYSQL_PASSWORD'] = 'YES'
pingpong.config['MYSQL_DB'] = 'pingpong_db'
pingpong.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(pingpong)

# 确保目录存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 百度AI对话相关配置
BAIDU_API_KEY = 'iYISN5O3tRkJgfidTg7EejvE'
BAIDU_SECRET_KEY = 'MrCIflCOPZuNSWXdww3M5ITR8jXO9ALk'

def get_access_token():
    url = f"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={BAIDU_API_KEY}&client_secret={BAIDU_SECRET_KEY}"
    response = requests.post(url)
    return response.json().get("access_token")

# 装饰器，用于告诉 Flask 哪个 URL 应该触发下面的函数。在这个例子中，它指定了根 URL（即网站的主页）。
@pingpong.route("/") 
def show_login():
    return render_template('login.html')
    # return render_template('dashboard.html')

# 用户注册路由
@pingpong.route('/signup', methods=['POST'])
def register():
    try:
        # 确保能正确获取 JSON 数据
        data = request.get_json(force=True)
        email = data.get('email')
        password = data.get('password')

        # 输入验证
        if not email or not password:
            print(f"收到的邮箱: {email}, 密码: {password}")  # 打印接收到的数据用于调试
            return jsonify({'error': '邮箱和密码不能为空'}), 400

        cur = mysql.connection.cursor()
        # 检查邮箱是否已存在
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            return jsonify({'error': '该邮箱已被注册'}), 400

        # 密码哈希处理
        hashed_password = generate_password_hash(password)

        cur.execute("INSERT INTO users(email, password) VALUES (%s, %s)",
                    (email, hashed_password))
        mysql.connection.commit()
        cur.close()

        return jsonify({'message': '注册成功，请登录'}), 201
    except Exception as e:
        mysql.connection.rollback()
        return jsonify({'error': f'注册失败: {str(e)}'}), 500

# 修改后的登录路由
@pingpong.route("/login", methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cur.fetchone()
    cur.close()

    if user and check_password_hash(user['password'], password):
        session['user_id'] = user['id']
        session['username'] = user['username']
        return redirect(url_for('dashboard'))
    else:
        flash('用户名或密码错误', 'error')
        return redirect(url_for('show_login'))
    
# 添加登出路由
@pingpong.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('show_login'))

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('show_login'))
        return f(*args, **kwargs)
    return decorated_function

@pingpong.route("/dashboard")
@login_required
def dashboard():
    return render_template('dashboard.html', username=session['username'])

# AI对话路由
@pingpong.route('/page/analytics', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        user_input = request.json.get('question') if request.is_json else request.form.get('question')
        if not user_input:
            return jsonify({'error': '请输入问题内容'}), 400
            
        try:
            access_token = get_access_token()
            url = f"https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-speed-128k?access_token={access_token}"
            
            payload = {
                "messages": [{"role": "user", "content": user_input}],
                "stream": False,
                "temperature": 0.9,
                "top_p": 0.7,
                "penalty_score": 1,
                "system": "从现在起，你是一名专业且经验丰富的乒乓球运动助手。无论是乒乓球运动员在技术提升方面遇到的难题，还是日常训练计划的制定，亦或是在运动过程中的健康保障、伤病预防等方面的问题，你都能给出精准、专业且实用的建议。你对乒乓球运动的各项技巧细节了如指掌，熟悉不同类型运动员的特点和需求，能够根据他们的实际情况，从发球、接球、击球、步伐移动等多个维度，提供个性化的运动建议。同时，你也深谙运动健康之道，知道如何帮助运动员保持良好的身体状态，合理安排饮食和休息，以应对高强度的训练和比赛。请随时准备为乒乓球运动员们提供优质的服务和建议。",
                "max_output_tokens": 4096
            }
            
            response = requests.post(url, json=payload)
            result = response.json()
            
            if 'result' in result:
                return jsonify({'answer': result['result']})
            else:
                return jsonify({'error': 'API响应异常', 'details': result.get('message', '')}), 500
        except Exception as e:
            pingpong.logger.error(f'请求失败: {str(e)}')
            return jsonify({'error': f'请求失败: {str(e)}'}), 500
            
    return render_template('chat.html')


# 图片处理路由
@pingpong.route('/page/transformer/image', methods=['POST'])
def predict_img():
    
    os.makedirs(pingpong.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(PROCESSED_FOLDER, exist_ok=True)

    # 检查是否有文件上传
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400
    
    # 保存上传文件
    filename = secure_filename(file.filename)
    input_path = os.path.join(pingpong.config['UPLOAD_FOLDER'], filename)
    file.save(input_path)
    
    try:
        # 第一阶段检测
        det_output_dir = os.path.join(PROCESSED_FOLDER, 'detection')
        os.makedirs(det_output_dir, exist_ok=True)
        det_cmd = [
            'python', r'../PaddleDetection/tools/infer.py',
            '-c', r'../PaddleDetection/configs/picodet/ppq.yml',
            '--infer_img', input_path,
            '-o', 'weights=../PaddleDetection/output/ppq/best_model.pdopt',
            '--output_dir', det_output_dir
        ]
        subprocess.run(det_cmd, check=True)
        
        # 第二阶段关键点检测
        kp_output_dir = os.path.join(PROCESSED_FOLDER, 'keypoint')
        os.makedirs(kp_output_dir, exist_ok=True)
        kp_cmd = [
            'python', r'../PaddleDetection/deploy/python/det_keypoint_unite_infer.py',
            '--det_model_dir', r'../model/models/detection/picodet_v2_s_320_pedestrian',
            '--keypoint_model_dir', r'../model/models/keypoint/tinypose_128x96',
            '--image_dir', det_output_dir,
            '--device', 'CPU',
            '--output_dir', kp_output_dir
        ]
        subprocess.run(kp_cmd, check=True)
        
        
        return jsonify({
            'original': url_for('static', filename=f'uploads/{filename}'),
            'processed': url_for('static', filename=f'processed/keypoint/{filename.replace(r".png",r"_vis_vis.jpg")}'),
        })
        
    except subprocess.CalledProcessError as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500
    finally:
        # 清理临时文件（可选）
        pass

# 视频处理路由
@pingpong.route('/page/transformer/video', methods=['POST'])
def predict_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400
    
    # 生成唯一标识符
    task_id = str(uuid.uuid4())
    video_dir = os.path.join(PROCESSED_FOLDER, 'video', task_id)
    os.makedirs(video_dir, exist_ok=True)
    # 保存原始视频
    filename = secure_filename(file.filename)
    input_path = os.path.join(video_dir, filename)
    file.save(input_path)
    
    try:
        # 1. 拆分视频为帧
        frame_dir = os.path.join(video_dir, 'frames')
        os.makedirs(frame_dir, exist_ok=True)
        split_cmd = [
            'ffmpeg', '-i', input_path, 
            '-vf', 'fps=30',  # 保持与原视频相同帧率
            os.path.join(frame_dir, 'frame_%05d.png')
        ]
        subprocess.run(split_cmd, check=True)
        
        # 2. 目标检测处理
        det_dir = os.path.join(video_dir, 'detected')
        os.makedirs(det_dir, exist_ok=True)
        det_cmd = [
            'python', r'../PaddleDetection/tools/infer.py',
            '-c', r'../PaddleDetection/configs/picodet/ppq.yml',
            '--infer_dir', frame_dir,
            '-o', 'weights=../PaddleDetection/output/ppq/best_model.pdopt',
            '--output_dir', det_dir
        ]
        subprocess.run(det_cmd, check=True)
        
        # 3. 关键点检测处理
        kp_dir = os.path.join(video_dir, 'keypoints')
        os.makedirs(kp_dir, exist_ok=True)
        kp_cmd = [
            'python', r'../PaddleDetection/deploy/python/det_keypoint_unite_infer.py',
            '--det_model_dir', r'../model/models/detection/picodet_v2_s_320_pedestrian',
            '--keypoint_model_dir', r'../model/models/keypoint/tinypose_128x96',
            '--image_dir', det_dir,
            '--device', 'CPU',
            '--output_dir', kp_dir
        ]
        subprocess.run(kp_cmd, check=True)
        
        # 4. 合成视频
        output_video = os.path.join(video_dir, 'processed_' + filename)
        synthesize_cmd = [
            'ffmpeg', '-framerate', '30',  # 与拆分时帧率一致
            '-i', os.path.join(kp_dir, 'frame_%05d_vis_vis.jpg'),
            '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
            output_video
        ]
        subprocess.run(synthesize_cmd, check=True)
        
        return jsonify({
            'original': url_for('static', filename=f'processed/video/{task_id}/{filename}'),
            'processed': url_for('static', filename=f'processed/video/{task_id}/processed_{filename}')
        })
        
    except subprocess.CalledProcessError as e:
        return jsonify({'error': f'处理失败: {str(e)}'}), 500

if __name__ == "__main__":
    pingpong.run(debug=True)