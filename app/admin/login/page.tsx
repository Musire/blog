"use client";

import { adminLogin } from "@/app/actions/admin.actions";
import { useState } from "react";

export default function AdminLogin() {
  const PIN_LENGTH = 6;
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  async function submitPIN(finalPin: string) {
    const res = await adminLogin(finalPin)

    if (!res.success) {
      setError("Invalid PIN");
      setPin("");
      return;
    }

    window.location.href = "/admin/post";
  }

  function handleKeyPress(num: string) {
    if (pin.length >= PIN_LENGTH) return;

    const newPin = pin + num;
    setPin(newPin);

    if (newPin.length === PIN_LENGTH) {
      submitPIN(newPin);
    }
  }

  function handleDelete() {
    setPin((prev) => prev.slice(0, -1));
  }

  return (

    <main className="page-layout">
      <div className="display-layout flex flex-col items-center justify-between h-screen pb-10 px-6">
        {/* Header */}
        <div className="mt-20 text-center">
          <h1 className="text-2xl font-semibold">Set Admin PIN</h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your secret PIN to access the admin panel.
          </p>
        </div>
        {/* PIN circles */}
        <div className="flex space-x-3 mt-6">
          {[...Array(PIN_LENGTH)].map((_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full border-2 
              ${pin[i] ? "bg-black border-black" : "border-gray-400"}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-xs mt-10">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleKeyPress(String(n))}
              className="text-2xl font-semibold py-3"
            >
              {n}
            </button>
          ))}

          {/* Empty placeholder */}
          <div></div>

          {/* Zero */}
          <button
            onClick={() => handleKeyPress("0")}
            className="text-2xl font-semibold py-3"
          >
            0
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="text-xl font-semibold py-3"
          >
            ⌫
          </button>

        </div>
      </div>
    </main>
  );
}
