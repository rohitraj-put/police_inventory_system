import { useState } from "react";

export default function MalkhanEntry() {
  const [formData, setFormData] = useState({
    firNo: "",
    mudNo: "",
    gdNo: "",
    ioName: "",
    banam: "",
    underSection: "",
    description: "",
    place: "",
    court: "",
    firYear: "",
    gdDate: "",
    DakhilKarneWala: "",
    caseProperty: "",
    actType: "",
    status: "",
    avatar: null,
  });

  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, avatar: file });

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key]) {
        setError("All fields are required");
        return;
      }
    }
    setError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/malkhana", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Malkhana Entry</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          {Object.keys(formData).map((field) =>
            field === "description" ? (
              <div key={field} className="col-span-3">
                <label className="block text-gray-700 capitalize">
                  {field}
                </label>
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 h-24"
                ></textarea>
              </div>
            ) : field === "gdDate" ? (
              <div key={field}>
                <label className="block text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type="date"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
            ) : field !== "avatar" ? (
              <div key={field}>
                <label className="block text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
            ) : (
              <div key={field} className="col-span-3">
                <label className="block text-gray-700 capitalize">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Avatar Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                  />
                )}
              </div>
            )
          )}
          <button
            type="submit"
            className="bg-[#8c7a48] w-full text-white px-4 py-2 rounded hover:bg-[#af9859]"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="overflow-x-auto p-6">
        <h2 className="text-2xl font-bold mb-4">FSL Entries</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="px-4 py-2">FIR No</th>
              <th className="px-4 py-2">Mud No</th>
              <th className="px-4 py-2">GD No</th>
              <th className="px-4 py-2">IO Name</th>
              <th className="px-4 py-2">Banam</th>
              <th className="px-4 py-2">Under Section</th>
              <th className="px-4 py-2">Place</th>
              <th className="px-4 py-2">Court</th>
              <th className="px-4 py-2">FIR Year</th>
              <th className="px-4 py-2">GD Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Avatar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">firNo</td>
              <td className="px-4 py-2">mudNo</td>
              <td className="px-4 py-2">gdNo</td>
              <td className="px-4 py-2">ioName</td>
              <td className="px-4 py-2">banam</td>
              <td className="px-4 py-2">underSection</td>
              <td className="px-4 py-2">place</td>
              <td className="px-4 py-2">court</td>
              <td className="px-4 py-2">firYear</td>
              <td className="px-4 py-2">gdDate</td>
              <td className="px-4 py-2 font-semibold text-blue-600">status</td>
              <td className="px-4 py-2">
                <img
                  src="https://th.bing.com/th/id/OIP.zvuHnmfWLjEfDvqTOe4PmwHaE8?pid=ImgDet&w=474&h=316&rs=1"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
