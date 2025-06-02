import { FaTh, FaRegChartBar, FaCommentAlt, FaUser, FaUserEdit  } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "View Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        icon: <FaUser />,
        path: "/profile",
      },
      {
        title: "Edit Profile",
        icon: <FaUserEdit />,
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Customer Support",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
