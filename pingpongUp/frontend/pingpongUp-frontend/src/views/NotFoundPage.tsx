const NotFoundPage = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-1">
            <div className="flex flex-col p-6 md:p-10 bg-black-700">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs text-center">
                        <h1 className="text-9xl font-bold text-orange-600">404</h1>
                        <a
                            href="/page/dashboard"
                            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
                        >
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;