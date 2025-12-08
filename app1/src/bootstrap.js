import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

// 🚨 异步加载远程模块
// 格式： import('本地模块名/暴露的别名')
const RemoteButton = React.lazy(() => import("remoteApp/Button"));

const App = () => (
  <div>
    <h1>Host App (App 1)</h1>
    <p>正在加载 App 2 的远程组件...</p>
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteButton>Host 传递给 Remote Button 的内容</RemoteButton>
    </Suspense>
  </div>
);

createRoot(document.getElementById("root")).render(<App />);
