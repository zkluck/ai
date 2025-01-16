'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!inputText.trim()) return;

    try {
      setLoading(true);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.content);
        setInputText(''); // 清空输入框
      } else {
        console.error('聊天请求失败:', data.error);
        setMessage('发生错误，请稍后重试');
      }
    } catch (error) {
      console.error('请求出错:', error);
      setMessage('发生错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4 min-h-[100px] p-4 bg-gray-50 rounded">
        {message || '等待响应...'}
      </div>

      <div className="flex gap-2">
        <textarea
          className="flex-1 p-2 border rounded resize-none"
          rows={2}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="输入消息..."
          disabled={loading}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 whitespace-nowrap"
          onClick={handleChat}
          disabled={loading || !inputText.trim()}
        >
          {loading ? '发送中...' : '发送'}
        </button>
      </div>
    </div>
  );
}
