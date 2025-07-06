// src/pages/SubmitTool.jsx
export default function SubmitTool() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit a New AI Tool</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tool Name</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="text" placeholder="Enter tool name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="Enter description"></textarea>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
