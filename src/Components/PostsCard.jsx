import { useNavigate } from "react-router-dom";

export default function PostsCard({ id,title, body, user }) {
    const navigate = useNavigate();
  // Limit body to ~20 words
    const previewBody = body.split(" ").slice(0, 20).join(" ") + (body.split(" ").length > 20 ? "..." : "");

    return (
    <div 
    onClick={() => navigate(`/postdetail/${id}`)}
    className="bg-[#fdfdfd] p-6 rounded-xl shadow-md hover:shadow-lg transition max-w-md w-full h-72 mb-4 ">
        
        <div className="flex items-center gap-3 bg-[#f3e6ff72]  rounded-md px-3 py-2 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
            {user.name.charAt(0)}
        </div>
        <div className="text-blue-700 font-medium text-sm">{user.name}</div>
        </div>

        
        <h2 className="text-lg  mb-4 text-gray-900">
        {title.length > 40 ? title.slice(0, 40) + "..." : title}
        </h2>

        <div className="flex flex-col justify-center align-middle min-h-[100px]">
        <p className="text-gray-700 text-sm">{previewBody}</p>
        </div>
    </div>
    );
}
