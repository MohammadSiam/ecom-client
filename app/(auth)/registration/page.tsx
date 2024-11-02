"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const RegistrationPage: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState({
    strUserName: "",
    strEmail: "",
    strPhone: "",
    strPassword: "",
    strImageURL: null as File | null,
  });

  const [errors, setErrors] = useState<{
    strUserName?: string;
    strEmail?: string;
    strPhone?: string;
    strPassword?: string;
    form?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData({ ...data, strImageURL: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setData((prev) => ({ ...prev, strImageURL: null }));
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (data.strPassword.length < 8 || !/\d/.test(data.strPassword)) {
      newErrors.strPassword =
        "Password must be at least 8 characters long and contain a number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.strEmail)) {
      newErrors.strEmail = "Invalid email address.";
    }

    if (!/^\d{11}$/.test(data.strPhone)) {
      newErrors.strPhone = "Phone number must be exactly 11 digits.";
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate fields
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // const jsonData = JSON.stringify(data);

      // console.log("fromdata", jsonData);

      const formData: any = new FormData();
      formData.append("strUserName", data.strUserName);
      formData.append("strEmail", data.strEmail);
      formData.append("strPhone", data.strPhone);
      formData.append("strPassword", data.strPassword);
      if (data.strImageURL) {
        formData.append("strImageURL", data.strImageURL);
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        setErrors({ ...errors, form: response.data.message });
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ ...errors, form: error.response.data.message });
      } else {
        setErrors({ ...errors, form: "An unexpected error occurred" });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="strUserName"
                  name="strUserName"
                  value={data.strUserName}
                  onChange={handleChange}
                  className="border-gray-300 border w-full rounded-md px-3 py-2"
                />
                {errors.strUserName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.strUserName}
                  </p>
                )}
              </div>

              <div className="col-span-2 mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="strEmail"
                  name="strEmail"
                  value={data.strEmail}
                  onChange={handleChange}
                  className="border-gray-300 border w-full rounded-md px-3 py-2"
                />
                {errors.strEmail && (
                  <p className="text-red-500 text-xs mt-1">{errors.strEmail}</p>
                )}
              </div>

              <div className="col-span-2 mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="strPassword"
                    name="strPassword"
                    value={data.strPassword}
                    onChange={handleChange}
                    className="border-gray-300 border w-full rounded-md px-3 py-2"
                  />
                  {data.strPassword && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-4 py-2"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  )}
                </div>
                {errors.strPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.strPassword}
                  </p>
                )}
              </div>

              <div className="col-span-2 mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="phone"
                  id="strPhone"
                  name="strPhone"
                  value={data.strPhone}
                  onChange={handleChange}
                  className="border-gray-300 border w-full rounded-md px-3 py-2"
                />
                {errors.strPhone && (
                  <p className="text-red-500 text-xs mt-1">{errors.strPhone}</p>
                )}
              </div>
              <div className="col-span-2 mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="strImageURL"
                  name="strImageURL"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="border-gray-300 border w-full rounded-md px-3 py-2"
                />
              </div>
              {previewImage && (
                <div className="col-span-2 mb-4 relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="rounded-md w-full"
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {errors.form && <p className="text-red-500 mb-4">{errors.form}</p>}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-sm">
            Already registered?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
