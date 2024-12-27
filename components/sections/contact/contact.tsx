import ButtonOne from "@/components/ButtonOne";

const ContactSection= () => {
    return (
      <section id="contactSection" className={`
        text-gray-50 
        w-[1200px] max-w-full
      `} style={{
        height: "calc(100vh - 70px)"
      }}>
          <div className={`
            rounded-t-[30px]
            w-full h-[80vh]
            flex flex-col items-center right-0 px-3
          bg-[#421e7f9c] backdrop-blur-md
          `}>
            <h2 className="font-bold text-[32px] mb-5 mt-10 text-white">Contact</h2>
            <div className="flex justify-center items-center w-full">
              <form className={`
                flex flex-col 
                w-[400px] max-w-full 
                bg-[#b89de5] backdrop-blur-md text-black
                px-2 py-5 rounded-md
              `}>
                <p className={`leading-[16px] px-5 text-center mb-5 text-[#360834]`}>Leave your contact details and a developer will get in touch soon</p>
                <input 
                  className={`
                    my-1 h-3 w-full p-3 rounded-md 
                    placeholder:text-[#775b7e] bg-[#ffffff94]
                  `} 
                  placeholder="Name"
                  name="name"
                  autoComplete="true"
                />
                <input 
                  className={`
                    my-1 h-3 w-full p-3 rounded-md 
                    placeholder:text-[#775b7e] bg-[#ffffff94]
                  `} 
                  placeholder="Phone"
                  name="phone"
                  autoComplete="true"
                />
                <input 
                  className={`
                    my-1 h-3 w-full p-3 rounded-md 
                    placeholder:text-[#775b7e] bg-[#ffffff94]
                  `} 
                  placeholder="Email"
                  name="email"
                  autoComplete="true"
                />
                <input 
                  className={`
                    my-1 h-3 w-full p-3 rounded-md 
                    placeholder:text-[#775b7e] bg-[#ffffff94]
                  `} 
                  placeholder="Prefered Contact Method"
                  name="message"
                  autoComplete="true"
                />
                <div className={`mt-1 w-full flex flex-col`}>
                  <ButtonOne name="SEND"/>
                </div>
              </form>
            </div>
          </div>
      </section>
    );
}

export default ContactSection;