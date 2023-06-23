import React from "react";

const Main = () =>{
    document.body.classList.add("overflow-x-hidden");

    return (
        <div className="grid gap-y-20 w-full pt-20">
            <p className="font-serif text-4xl text-center">НОВЧАССЕРВИС</p>
            <div className="pb-48">
                <div className="absolute flex left-0 w-[53%] h-48 trapezoid-left bg-black font-serif items-center border border-black">
                    <div className="w-[80%] text-center ml-[5%]">
                        <a className="text-white text-xs md:text-xl">НОВЧАССЕРВИС - это сервис в Великом Новгорде по ремнту часов и изготовлению ключей.</a>
                    </div>
                </div>
                <div className="absolute flex right-0 w-[53%] h-48 trapezoid-right font-serif items-center border border-black bg-[url('https://sun9-73.userapi.com/impg/kbykG_uvgCcnxZSt7nop0YYzAcYktiyXyQbGFA/VuhEJ2yCMZk.jpg?size=825x461&quality=96&sign=052ed25abffd3249cbb6af603009b364&type=album')] bg-cover bg-center"/>
            </div>
            <div className="pb-48">
                <div className="absolute flex left-0 w-[53%] h-48 trapezoid-left font-serif items-center border border-black bg-[url('http://islamosfera.ru/wp-content/uploads/2020/11/%D0%98%D1%81%D0%BB%D0%B0%D0%BC%D1%81%D0%BA%D0%B8%D0%B5-%D1%87%D0%B0%D1%81%D1%8B-1024x683.jpg')] bg-cover bg-center"/>
                <div className="absolute flex right-0 w-[53%] h-48 trapezoid-right bg-white font-serif items-center border border-black">
                    <div className="right-0 pl-[5%] w-[80%] text-center m-auto">
                        <a className="text-black text-xs md:text-xl">Огромный выбор часовых ремешков и браслетов, которые Вам установят на месте и при необходимости отрегулируют их длину.</a>
                    </div>
                </div>
            </div>
            <div className="grid gap-2 place-items-center text-3xl pb-24">
                <p className="text-5xl pb-5">Контакты:</p>
                <a>Телефон: +7(964)311 72-72</a>
                <a>Почта: maks.sarychev.2003@mail.ru</a>
            </div>
        </div>
    );
};

export default Main;