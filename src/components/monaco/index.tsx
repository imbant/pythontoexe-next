import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { Spin } from 'antd'

const PythonEditor = (props: { onChange: (input: string) => void, isLoading: boolean }) => {
    const editorRef = useRef(null);
    const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);  // 用于存储编辑器实例

    useEffect(() => {
        if (editorRef.current) {
            const defaultValue = "# input your python code \nprint('Hello, Python To EXE!')"
            props.onChange(defaultValue);

            editorInstance.current = monaco.editor.create(editorRef.current, {
                value: defaultValue,
                language: 'python',
                theme: 'vs-dark',
            });

            // 获取用户的代码
            const getCode = () => {
                const code = editorInstance.current?.getValue();
                props.onChange(code ?? '');
            };

            // 示例：每次内容变化时打印代码
            editorInstance.current?.onDidChangeModelContent(() => {
                getCode();
            });
        }
        return () => {
            editorInstance.current?.dispose();
        };
    }, []);

    return <Spin spinning={props.isLoading} style={{ height: '400px' }}>
        <div ref={editorRef} style={{ height: '400px' }} />
    </Spin>
    
};

export default PythonEditor;
