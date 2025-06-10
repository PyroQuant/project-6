import React from "react";

export const Bienvenida = (): JSX.Element => {
  return (
    <main className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[390px] h-[844px] relative">
        <section className="absolute w-[390px] h-[609px] top-0 left-0">
          <div className="absolute w-[204px] h-[226px] top-[383px] left-[94px]">
            <div className="relative w-[202px] h-[226px]">
              <div className="absolute top-[139px] left-11 font-['Poppins'] font-bold text-[#3f6cea] text-[40px] tracking-[0] leading-[normal]">
                JUMP
              </div>

              <img
                className="w-[202px] h-[226px] top-0 left-0 absolute object-cover"
                alt="Ilustracion sin titulo 1"
                src="/ilustracio-n-sin-ti-tulo-1.png"
              />
            </div>
          </div>

          <img
            className="w-[216px] h-[226px] top-[216px] left-0 absolute object-cover"
            alt="Ilustracion sin titulo 3"
            src="/ilustracio-n-sin-ti-tulo-3.png"
          />

          <img
            className="w-[314px] h-[298px] top-[31px] left-[76px] absolute object-cover"
            alt="Ilustracion sin titulo 4"
            src="/ilustracio-n-sin-ti-tulo-4.png"
          />

          {/* Status Bar */}
          <header className="flex w-[390px] items-center justify-between px-3 py-0 absolute top-0 left-0">
            <div className="relative flex-1 h-11">
              <div className="inline-flex items-center gap-0.5 relative top-4 left-[26px]">
                <div className="relative w-fit mt-[-1.00px] font-['Roboto'] font-normal text-x-2 text-[17px] tracking-[-0.68px] leading-[normal] whitespace-nowrap">
                  9:41
                </div>

                <img
                  className="relative w-4 h-4"
                  alt="Location services"
                  src="/location-services---active-with-condition.svg"
                />
              </div>
            </div>

            <div className="relative w-[164px] h-11" />

            <div className="relative flex-1 h-11">
              <div className="absolute w-[76px] h-3.5 top-[18px] left-[13px]">
                <div className="inline-flex items-center justify-end gap-1 relative">
                  {/* Signal Strength */}
                  <div className="relative w-5 h-3.5">
                    <div className="h-3 top-px left-4 absolute w-[3px] bg-x-2 rounded-[1px]" />
                    <div className="h-2.5 top-[3px] left-[11px] absolute w-[3px] bg-x-2 rounded-[1px]" />
                    <div className="h-[7px] top-1.5 left-1.5 absolute w-[3px] bg-x-2 rounded-[1px]" />
                    <div className="h-[5px] top-2 left-0 absolute w-[3px] bg-x-2 rounded-[1px]" />
                  </div>

                  {/* WiFi Icon */}
                  <img
                    className="relative w-5 h-3"
                    alt="Network wifi full"
                    src="/network---wifi-full.svg"
                  />

                  {/* Battery Icon */}
                  <div className="relative w-7 h-3.5">
                    <div className="relative h-[13px]">
                      <div className="absolute w-[21px] h-[9px] top-0.5 left-0.5 bg-x-2 rounded-[1.33px]" />
                      <img
                        className="absolute w-7 h-[13px] top-0 left-0"
                        alt="Battery frame"
                        src="/battery-frame.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </section>

        <section className="absolute w-[393px] h-[243px] top-[609px] left-0">
          <img
            className="w-[223px] h-[227px] top-0 left-[167px] absolute object-cover"
            alt="Ilustracion sin titulo 2"
            src="/ilustracio-n-sin-ti-tulo-2.png"
          />

          <footer className="flex flex-col w-[393px] items-center justify-center gap-2.5 p-2.5 absolute top-[218px] left-0">
            <div className="relative w-[134px] h-[5px] bg-x-20 rounded-[100px]" />
          </footer>
        </section>
      </div>
    </main>
  );
};
