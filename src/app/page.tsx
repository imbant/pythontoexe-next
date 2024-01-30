"use client";

import { FormEventHandler, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { Spin } from 'antd'

const PythonEditor = dynamic(() => import('@/components/monaco'), {
  ssr: false, // 禁用服务端渲染
});


const defaultSubmitText = "Get Started";

export default function Home() {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>(defaultSubmitText);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setSubmitText("Loading...");
    } else {
      setSubmitText(defaultSubmitText);
    }
  }, [isLoading])

  const handleSubmit = async () => {
    if (isLoading) {
      return
    }

    setIsLoading(true);

    let blob: Blob;
    try {
      blob = await fetch("http://139.224.103.165:3000", {
        method: "POST",
        body: JSON.stringify({ sourceCode }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.blob());
    } catch (error) {
      setIsLoading(false);

      console.error(error)
    }

    // 创建 Blob URL
    const url = window.URL.createObjectURL(blob!);
    // 创建一个链接元素
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // 设置下载的文件名
    a.download = "PythonToExe.exe"; // 你希望保存的文件名
    // 将链接元素添加到页面并点击它
    document.body.appendChild(a);
    a.click();
    // 移除链接元素并释放 Blob URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setIsLoading(false);
  };

  return (
    <>
      <header>
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="mx-auto mb-8 w-full max-w-3xl text-center md:mb-12 lg:mb-16">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">Python to EXE: Simplify Your Coding Journey!</h1>
            <p className="mx-auto mb-6 max-w-lg text-base text-[#636262] md:mb-10 lg:mb-12">No Tech Background? No Problem! Easily Create Standalone Applications from Your Python Scripts and Share Your Achievements with the World!</p>
            <div className="flex items-center justify-center">
              <a onClick={handleSubmit} href="#" className="mr-5 flex items-center bg-[#276ef1] px-8 py-4 font-semibold text-white transition [box-shadow:rgb(171,_196,245)-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] md:mr-6 lg:mr-8">
                <p className="mr-6 font-bold">{submitText}</p>
              </a>
              <a href="https://imbant.github.io/blog/about/" className="flex font-bold">
                <p className="text-black">about author</p>
              </a>
            </div>
          </div>
          <Spin spinning={isLoading}>
            <PythonEditor onChange={(input: string) => setSourceCode(input)} />
          </Spin>
        </div>
      </header>

    </>
  );
}
