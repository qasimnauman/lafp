const FormField = ({ label, htmlFor, icon, input }) => (
  <div className="space-y-2">
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-semibold text-gray-700 tracking-wide"
    >
      {icon && <span className="text-blue-600">{icon}</span>}
      {label}
      <span className="text-red-500">*</span>
    </label>
    <div className="relative">{input}</div>
  </div>
);

export default FormField;
