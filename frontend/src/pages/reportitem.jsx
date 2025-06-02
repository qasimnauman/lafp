import React, { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import FormField from "../components/reportitem/formfield";
import ImageUpload from "../components/reportitem/imageupload";
import ContactInfo from "../components/reportitem/contactinfo";
import TabButton from "../components/reportitem/tabbutton";

const ReportItemPage = () => {
  const [activeTab, setActiveTab] = useState("lost");
  const [reportAnonymously, setReportAnonymously] = useState(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    date: "",
    imageFile: null,
  });

  // Update handlers for inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageSelect = (file) => {
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = () => {
    // Just log form data — backend dev will handle sending this data
    console.log("Form data to submit:", {
      ...formData,
      reportAnonymously,
      activeTab,
    });
    alert("Form data is ready to be sent to backend!");
  };

  const isLost = activeTab === "lost";

  return (
    <div className="min-h-screen py-12 px-4 ">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-2xl rounded-2xl border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Report an Item</h1>
          <p className="text-sm text-blue-600">
            Report a {isLost ? "lost" : "found"} item at Air University Islamabad campus
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <TabButton
            label="I Lost an Item"
            active={isLost}
            onClick={() => setActiveTab("lost")}
          />
          <TabButton
            label="I Found an Item"
            active={!isLost}
            onClick={() => setActiveTab("found")}
          />
        </div>

        {/* Form */}
        <div className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold text-blue-700 mb-1">
            {isLost ? "Report Lost Item" : "Report Found Item"}
          </h2>
          <p className="text-sm mb-6">
            Provide details about the item you {activeTab}.
          </p>

          {/* Item Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              label="Item Name"
              htmlFor="itemName"
              input={
                <input
                  id="itemName"
                  type="text"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="e.g. Laptop, Wallet"
                />
              }
            />
            <FormField
              label="Category"
              htmlFor="category"
              input={
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="documents">Documents</option>
                </select>
              }
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <FormField
              label="Description"
              htmlFor="description"
              input={
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm h-24"
                  placeholder="Include identifying features"
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
                <select
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  <option value="">Select location</option>
                  <option value="library">Library</option>
                  <option value="cafeteria">Cafeteria</option>
                  <option value="lab">Laboratory</option>
                </select>
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
                  className="w-full border rounded-md p-2 text-sm"
                />
              }
            />
          </div>

          {/* Image Upload */}
          <ImageUpload onFileSelect={handleImageSelect} />

          {/* Anonymous checkbox */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600"
                checked={reportAnonymously}
                onChange={() => setReportAnonymously(!reportAnonymously)}
              />
              Report Anonymously
            </label>
          </div>

          {/* Contact Info */}
          <ContactInfo />

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit {isLost ? "Lost" : "Found"} Item Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportItemPage;
