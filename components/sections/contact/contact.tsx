import ButtonTwo from "@/components/ButtonTwo";

const ContactSection = () => {
  const inputClassName = `
    my-1 h-3 w-full p-3 rounded-md 
    placeholder:text-[#A6BBCD] bg-[#151727] text-white
  `;

  return (
    <section
      id="contactSection"
      className={`
        text-gray-50 
        w-[1200px] max-w-full
      `}
    >
      <div
        className={`
          rounded-t-[30px]
          w-full pb-20
          flex flex-col items-center px-3
          bg-[#0D0E15] backdrop-blur-md
        `}
        style={{
          WebkitBackdropFilter: "blur(20px)",
          backdropFilter: "blur(20px)",
        }}
      >
        <h2 className="font-bold text-[32px] mb-5 mt-10 text-white">Contact</h2>
        <div className="flex justify-center items-center w-full">
          <form
            className={`
              flex flex-col 
              w-[400px] max-w-full 
              bg-[#2A6987] backdrop-blur-md text-black
              px-2 py-5 rounded-md
            `}
          >
            <p
              className={`leading-[16px] px-5 text-center mb-5 text-[#E6E9EF]`}
            >
              Leave your contact details and a developer will get in touch soon
            </p>
            <input
              className={inputClassName}
              placeholder="Name"
              name="name"
              autoComplete="true"
            />
            <input
              className={inputClassName}
              placeholder="Phone"
              name="phone"
              autoComplete="true"
            />
            <input
              className={inputClassName}
              placeholder="Email"
              name="email"
              autoComplete="true"
            />
            <input
              className={inputClassName}
              placeholder="Message"
              name="message"
              autoComplete="true"
            />
            <div className={`mt-1 w-full flex flex-col`}>
              <ButtonTwo name="SEND" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;