"use client";

import { FormEventHandler, useState, useEffect } from "react";
import dynamic from 'next/dynamic';

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
          <div style={{ height: '400px' }}>
            {/* PythonEditor 是客户端懒加载的，所以 dom 一开始没有；这里固定一个高度避免闪 */}
            <PythonEditor isLoading={isLoading} onChange={(input: string) => setSourceCode(input)} />
          </div>
        </div>
      </header>
      <main>
        <section>
          <div className="mx-auto w-full max-w-7xl px-5 ">
            <p className="text-center text-sm font-bold uppercase">3 easy steps</p>
            <h2 className="text-center text-3xl font-bold md:text-5xl">How it works</h2>
            <p className="mx-auto mb-12 mt-4 max-w-lg text-center text-[#647084]">Transforming your Python scripts into executable files is seamless with our platform, powered by PyInstaller. Here&apos;s how you can convert your code into a standalone application in just a few simple steps:</p>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col gap-4 rounded-md border border-solid border-[#dfdfdf] bg-white p-8 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#276ef1]">
                  <p className="text-xl font-bold text-white">1</p>
                </div>
                <p className="text-xl font-semibold">Write or Upload Your Script</p>
                <p className="text-sm text-[#647084]">Start by writing your Python code directly on our website or upload your existing Python script.</p>
              </div>
              <div className="flex flex-col gap-4 rounded-md border border-solid border-[#dfdfdf] bg-white p-8 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#276ef1]">
                  <p className="text-xl font-bold text-white">2</p>
                </div>
                <p className="text-xl font-semibold">Convert with One Click</p>
                <p className="text-sm text-[#647084]">Press the &quot;{defaultSubmitText}&quot; button, and our tool will use PyInstaller in the background to package your script into an EXE file.</p>
              </div>
              <div className="flex flex-col gap-4 rounded-md border border-solid border-[#dfdfdf] bg-white p-8 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#276ef1]">
                  <p className="text-xl font-bold text-white">3</p>
                </div>
                <p className="text-xl font-semibold">Download and Share</p>
                <p className="text-sm text-[#647084]">Once the conversion is complete, download your executable file and share it with the world or use it for your personal projects.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="block">
        <div className="py-16 md:py-24 lg:py-32 mx-auto w-full max-w-7xl px-5 md:px-10">
          <div className="flex-row flex justify-between max-[767px]:flex-col max-[767px]:items-start">
            <div className="w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial max-[767px]:">
              <h2 className="font-bold text-3xl md:text-5xl">Python to EXE</h2>
            </div>
            <div className="max-[991px]:ml-4 max-[991px]:flex-none max-[767px]: max-[767px]:mt-8">
              <div className="mb-4 flex max-w-[272px] items-start justify-start">
                {/* <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94bb99e6cf78_MapPin.svg" alt="" className="inline-block mr-3" /> */}
                <p className="text-[#636262] max-[479px]:text-sm">Simplify Your Coding Journey!</p>
              </div>
            </div>
          </div>
          <div className="mb-14 w-full [border-bottom:1.7px_solid_rgb(0,_0,_0)] mt-16">
          </div>
          <div className="flex-row flex justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
            <div className="font-semibold max-[991px]: max-[479px]:mb-4 max-[991px]:py-1 text-center sm:text-center">
              <a href="https://imbant.github.io/blog/about/" className="inline-block font-normal text-[#636262] transition hover:text-[#d6a701] sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6">About</a>
              <a href="https://github.com/imbant" className="inline-block font-normal text-[#636262] transition hover:text-[#d6a701] sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6">GitHub</a>
            </div>
            {/* <div className="max-[991px]:flex-none">
              <p className="text-[#636262] max-[479px]:text-sm">© Copyright 2021. All rights reserved.</p>
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
}
