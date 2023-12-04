// MessageArea.jsx
import React from "react";

const MessageArea = () => {
  // ...add messages content here
  return (
    <div className="flex-1 overflow-auto bg-purple-100">
      <div className="py-2 px-3">
        <div className="flex justify-center mb-2">
          <div className="rounded py-2 px-4 bg-stone-200">
            <p className="text-sm uppercase">February 20, 2018</p>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div
            className="rounded py-2 px-4"
            style={{ backgroundColor: "#FCF4CB" }}
          >
            <p className="text-xs">
              Messages to this chat and calls are now secured with end-to-end
              encryption. Tap for more info.
            </p>
          </div>
        </div>

        {/* first guy */}
        <div className="flex mb-2">
          <div className="rounded py-2 px-3 bg-slate-300">
            <p className="text-sm text-teal">Sylverter Stallone</p>
            <p className="text-sm mt-1">
              Hi everyone! Glad you could join! I am making a new movie.
            </p>
            <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
          </div>
        </div>

        {/* second guy - right-login */}
        <div className="flex justify-end mb-2">
          <div className="rounded py-2 px-3 bg-green-300">
            <p className="text-sm mt-1">Hi guys.</p>
            <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
          </div>
        </div>

        {/* third guy */}
        <div className="flex mb-2">
          <div
            className="rounded py-2 px-3 bg-blue-300"
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <p className="text-sm text-purple">Tom Cruise</p>
            <p className="text-sm mt-1">Get Andrés on this movie ASAP!</p>
            <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
