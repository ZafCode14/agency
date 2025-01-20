'use client';
import { useState } from "react";
import { sendEmail } from "@/actions/emailAction";
import ButtonTwo from "@/components/ButtonTwo";

const ContactSection = () => {
  const inputClassName = `
    my-1 h-3 w-full p-3 rounded-md 
    placeholder:text-[#A6BBCD] bg-[#151727] text-white
  `;

  // State to capture form input values
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    const { name, phone, email, message } = formData;

    // Prepare email content (you can customize this format as needed)
    const emailContent = `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `;

    try {
      // Call the sendEmail function with the content
      const response = await sendEmail(emailContent);

      // Show success message
      alert("Your message has been sent successfully!");

      // Clear the form inputs after successful email send
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email", error);
      // Optionally, show an error message
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <section
      className={`
        relative
        flex flex-col items-center px-3
        w-[1200px] max-w-full pb-20
        rounded-t-[30px]
        text-gray-50 bg-[#0D0E15]
      `}
      style={{
        WebkitTransform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <h2 className="font-bold text-[32px] mb-5 mt-10 text-white">Contact</h2>
      <div className="flex justify-center items-center w-full">
        <form
          onSubmit={handleSend} // Attach form submit handler
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
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className={inputClassName}
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            className={inputClassName}
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />
          <textarea
            className={`${inputClassName} h-[100px]`}
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <div className={`mt-1 w-full flex flex-col`}>
            <ButtonTwo name="SEND" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;