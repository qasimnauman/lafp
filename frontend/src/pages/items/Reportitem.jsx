import React, { useState, useEffect } from "react";
import { MapPin, Clock } from "lucide-react";
import FormField from "../../components/reportitem/formfield";
import ImageUpload from "../../components/reportitem/imageupload";
import CustomSearchDropdown from "../../components/common/CustomSearchDropDown";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ReportItemPage = () => {
  const location = useLocation();
  const defaultStatus = location.state?.status || "lost"; // fallback to 'lost'

  const [itemStatus, setItemStatus] = useState(defaultStatus);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/category/getallcategories");
        if (response.data.success) {
          setCategories(response.data.message); // array of category objects
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    date: "",
    imageFiles: [],
    hasItem: false,
    status: "lost",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageSelect = (files) => {
    setFormData((prev) => ({ ...prev, imageFiles: files }));
  };

  const handleSubmit = async () => {
    if (
      !formData.itemName ||
      !formData.category ||
      !formData.location ||
      !formData.date
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // if using token-based auth

      const form = new FormData();
      form.append("itemName", formData.itemName);
      form.append("category", formData.category);
      form.append("description", formData.description);
      form.append("location", formData.location);
      form.append("date", formData.date);
      form.append("hasItem", formData.hasItem);
      form.append("status", formData.status);

      formData.imageFiles.forEach((file) => {
        form.append("images", file); // field name matches upload.array("images", 5)
      });

      const response = await fetch("/api/v1/items/additem", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // only if you're using JWT
        },
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Item reported successfully!");
      } else {
        alert(result.message || "Failed to report item.");
      }
    } catch (error) {
      console.error("Submit failed", error);
      alert("An error occurred. Try again.");
    }
  };

  return (
    <div className="min-h-screen px-4 bg-gray-50">
      <div className="mx-auto bg-white p-8 shadow-2xl rounded-2xl border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Report an Item</h1>
          <p className="text-sm text-blue-600">
            Report a {itemStatus} item at Air University Islamabad campus
          </p>
        </div>

        {/* Status Radio Buttons */}
        <div className="flex">
          <div className="flex gap-8 items-center p-4">
            <label className="relative flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                name="status"
                type="radio"
                checked={itemStatus === "lost"}
                onChange={() => {
                  setItemStatus("lost");
                  setFormData((prev) => ({ ...prev, status: "lost" }));
                }}
              />
              <div className="w-6 h-6 bg-transparent border-2 border-red-500 rounded-full peer-checked:bg-red-500 peer-checked:border-red-500 transition duration-300 ease-in-out" />
              <span className="ml-2 text-red-600 font-medium">Lost Item</span>
            </label>

            <label className="relative flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                name="status"
                type="radio"
                checked={itemStatus === "found"}
                onChange={() => {
                  setItemStatus("found");
                  setFormData((prev) => ({ ...prev, status: "found" }));
                }}
              />
              <div className="w-6 h-6 bg-transparent border-2 border-green-500 rounded-full peer-checked:bg-green-500 transition duration-300 ease-in-out" />
              <span className="ml-2 text-green-600 font-medium">
                Found Item
              </span>
            </label>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 bg-white">
          <h2 className="text-xl font-semibold text-blue-700 mb-1">
            Report {itemStatus === "lost" ? "Lost" : "Found"} Item
          </h2>
          <p className="text-sm mb-6 text-gray-600">
            Provide details about the item you{" "}
            {itemStatus === "lost" ? "lost" : "found"}.
          </p>

          {/* Item Name & Category */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <FormField
                label="Item Name"
                htmlFor="itemName"
                input={
                  <input
                    id="itemName"
                    type="text"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-400"
                    placeholder="e.g. Laptop, Wallet"
                  />
                }
              />
            </div>
            <div className="flex-1">
              <FormField
                label="Category"
                htmlFor="category"
                input={
                  loadingCategories ? (
                    <div className="text-sm text-gray-500">
                      Loading categories...
                    </div>
                  ) : (
                    <CustomSearchDropdown
                      id="category"
                      label="Select category"
                      options={categories.map((cat) => ({
                        label: cat.name,
                        value: cat._id,
                      }))}
                      selected={
                        categories.find((cat) => cat._id === formData.category)
                          ?.name || ""
                      }
                      onSelect={(selectedValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: selectedValue,
                        }))
                      }
                    />
                  )
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <FormField
              label="Item Description"
              htmlFor="description"
              input={
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-400"
                  placeholder="Describe the item in detail..."
                />
              }
            />
          </div>

          {/* Location & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              label="Last Seen Location"
              htmlFor="location"
              icon={<MapPin size={16} className="text-blue-500" />}
              input={
                <CustomSearchDropdown
                  id="location"
                  label="Select location"
                  options={[
                    { label: "Library", value: "Library" },
                    { label: "Cafeteria", value: "Cafeteria" },
                    { label: "Laboratory", value: "Laboratory" },
                  ]}
                  selected={formData.location}
                  onSelect={(val) =>
                    setFormData((prev) => ({ ...prev, location: val }))
                  }
                />
              }
            />
            <FormField
              label="Date"
              htmlFor="date"
              icon={<Clock size={16} className="text-blue-500" />}
              input={
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-400"
                />
              }
            />
          </div>

          {/* Image Upload */}
          <ImageUpload
            onFileSelect={handleImageSelect}
            required={itemStatus === "found"}
          />

          {/* Item Possession (Only for "found") */}
          {itemStatus === "found" && (
            <div className="mb-6">
              <FormField
                label="Do you have the item with you?"
                htmlFor="hasItem"
                input={
                  <div className="flex items-center">
                    <input
                      id="hasItem"
                      type="checkbox"
                      checked={formData.hasItem}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hasItem: e.target.checked,
                        }))
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Yes, I have the item</span>
                  </div>
                }
              />
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit {itemStatus === "lost" ? "Lost" : "Found"} Item Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportItemPage;
