

import { IoLogoLinkedin } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";


const Footer = () => {


    return (
        <footer className="bg-[#272727] text-white lg:px-20 ps-[17px] pe-[16px]  pt-[60px] pb-[30px]">
            <div className="container flex gap-8 mx-auto flex-col md:flex-row md:gap-12">

                <div className="w-[338px]">
                    <div className="mb-4">
                        <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <text
                                x=""
                                y="35"
                                font-family="Arial, Helvetica, sans-serif"
                                font-size="36"
                                font-weight="bold"
                                fill="#39FF14"
                            >
                                athlend
                            </text>
                        </svg>
                    </div>
                    <h3 className="font-bold mb-2 font-roboto">Disclaimer</h3>
                    <p className="lg:text-sm text-[12px] leading-relaxed font-roboto">
                        We are a local sports Ground Booking Platofrm .
                        Book Your Ground Now !!
                    </p>

                     <div className="text-sm mt-4 hover:underline cursor-pointer font-roboto">
                            <Link href={{pathname: "/about-us"}}>
                             About Us
                            </Link>
                        </div>
                         <div className="text-sm mt-2 hover:underline cursor-pointer font-roboto">
                            <Link href={{pathname: "/contact-us"}}>
                            Contact Us
                            </Link>
                        </div>
                </div>




                <div>
                    <h3 className="font-bold mb-4 font-roboto">Legal</h3>
                    <ul className="space-y-2">
                        
                        <li className="text-sm hover:underline cursor-pointer font-roboto">
                            <Link href={{pathname: "/terms-and-conditions",query: { name: "privacy" }}} >
                            Privacy policy
                            </Link>
                        </li>
                        <li className="text-sm hover:underline cursor-pointer font-roboto">
                            <Link href={{pathname: "/terms-and-conditions",query: { name: "terms" }}}>
                            Terms and Conditions
                            </Link>
                        </li>
                        <li className="text-sm hover:underline cursor-pointer font-roboto">
                            <Link href={{pathname: "/refund-policy"}} >
                            Refund policy
                            </Link>
                        </li>
                        <li className="text-sm font-roboto">GST No:06GUXPB9356P1ZG </li>
                    </ul>
                </div>

                <div className="w-[339px]">
                    <h3 id="Contact Us" className="font-bold mb-4 font-roboto">Contact</h3>
                    <a className="flex items-center gap-2">
                        <FaWhatsapp className="mb-2 align-middle" />
                        <p className="text-sm mb-2 font-roboto cursor-pointer">
                            WhatsApp: +91 95821 72100</p>
                    </a>
                    <a className="flex items-center gap-2">
                        <IoIosCall className="mb-2 align-middle" />
                        <p className="text-sm mb-2 font-roboto cursor-pointer">Call: +91 95821 72100</p>
                    </a>
                    <a href="mailto: support@athlend.com" className="text-sm mb-2 font-roboto cursor-pointer">Email: support@athlend.com</a>
                    <p className="text-sm font-roboto mt-2">
                        Address: A Plus Technologies, FCA 3878 First Floor SGM Nagar Faridabad.
                    </p>
                </div>
                <div className="flex min-w-fit flex-col gap-4 font-roboto">
                    <h3 className="font-[600]">Follow us on</h3>
                    <div className=" flex gap-4 " >

                        <a className="hover:text-gray-400">
                            <AiFillInstagram className=" w-6 h-6 " />
                        </a>
                        <a className="hover:text-gray-400">
                            <IoLogoLinkedin className=" w-6 h-6 " />
                        </a>
                    </div>
                </div>

            </div>
            <div className=" items-center  border-t border-[#FFFFFF] mt-8 pt-4">
                <p className="text-sm text-center font-roboto">Copyright&copy; 2025. All rights reserved.</p>

            </div>

        </footer>

    );
};

export default Footer;
