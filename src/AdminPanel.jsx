import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "./Store/authStore";
import Sidebar from "./Components/Sidebar";
import { useReportStore } from "./Store/reportStore";
import { useCommentStore } from "./Store/CommentStore";
import { PostsContext } from "./Context/PostsContext";

export default function AdminPanel() {
  const {
    userEmail,
    adminEmails,
    blockedEmails,
    registeredEmails,
    addAdmin,
    removeAdmin,
    blockUser,
    unblockUser,
    getAllUsers,
  } = useAuthStore();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { reports, markAsReviewed, deleteReport, getPendingReports } =
    useReportStore();
  const { deleteComment } = useCommentStore();
  const { deletePost } = useContext(PostsContext);

  useEffect(() => {
    setUsers(getAllUsers());
    setLoading(false);
  }, [adminEmails, blockedEmails, registeredEmails]);

  const handleBlockUser = (email) => {
    if (blockUser(email)) {
      toast.success(`User ${email} blocked successfully`);
    } else {
      toast.warning(`User ${email} is already blocked`);
    }
  };

  const handleUnblockUser = (email) => {
    unblockUser(email);
    toast.success(`User ${email} unblocked successfully`);
  };

  const handleMakeAdmin = (email) => {
    if (addAdmin(email)) {
      toast.success(`User ${email} is now an admin`);
    } else {
      toast.warning(`User ${email} is already an admin`);
    }
  };

  const handleRemoveAdmin = (email) => {
    removeAdmin(email);
    toast.success(`User ${email} is no longer an admin`);
  };

  const handleReviewReport = (reportId, action) => {
    markAsReviewed(reportId);

    // Take action based on admin's choice
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    switch (action) {
      case "delete":
        if (report.type === "post") {
          deletePost(report.targetId);
          toast.success("Post deleted successfully");
        } else if (report.type === "comment") {
          deleteComment(report.targetId);
          toast.success("Comment deleted successfully");
        }
        break;

      case "block":
        blockUser(report.reportedUserEmail);
        toast.success(`User ${report.reportedUserEmail} blocked`);
        break;

      case "ignore":
        toast.info("Report ignored");
        break;
    }

    // Remove the report from the list
    deleteReport(reportId);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-4 bg-white py-6 px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-purple-700 ml-18">
              Admin Dashboard
            </h2>
          </div>
          <p className="text-gray-600">Logged in as admin: {userEmail}</p>
        </div>

        <div className="p-4 bg-purple-50 min-h-[calc(110vh-120px)]">
          <div className="p-6 bg-white rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4 text-purple-700">
              Pending Reports ({getPendingReports().length})
            </h2>

            {getPendingReports().length === 0 ? (
              <p className="text-gray-500">No pending reports</p>
            ) : (
              <div className="space-y-4">
                {getPendingReports().map((report) => (
                  <div
                    key={report.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {report.type === "post" ? "Post" : "Comment"} reported
                          by {report.reporterEmail}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Reason:</strong> {report.reason}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Content:</strong>{" "}
                          {report.content.substring(0, 100)}...
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Reported on:{" "}
                          {new Date(report.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() =>
                            handleReviewReport(report.id, "delete")
                          }
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                        >
                          Delete {report.type}
                        </button>
                        <button
                          onClick={() => handleReviewReport(report.id, "block")}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                        >
                          Block User
                        </button>
                        <button
                          onClick={() =>
                            handleReviewReport(report.id, "ignore")
                          }
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                        >
                          Ignore
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            {loading ? (
              <div className="p-6 text-center">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.email}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.email}
                          {user.isCurrentUser && (
                            <span className="ml-2 text-xs text-gray-500">
                              (You)
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.isAdmin ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Admin
                            </span>
                          ) : user.isBlocked ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Blocked
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              User
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                          {!user.isAdmin ? (
                            <>
                              <button
                                onClick={() => handleMakeAdmin(user.email)}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Make admin"
                              >
                                <i className="fas fa-crown"></i>
                              </button>
                              {user.isBlocked ? (
                                <button
                                  onClick={() => handleUnblockUser(user.email)}
                                  className="text-green-600 hover:text-green-900"
                                  title="Unblock user"
                                >
                                  <i className="fas fa-check-circle"></i>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleBlockUser(user.email)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Block user"
                                >
                                  <i className="fas fa-ban"></i>
                                </button>
                              )}
                            </>
                          ) : (
                            user.email !== "admin@example.com" && (
                              <button
                                onClick={() => handleRemoveAdmin(user.email)}
                                className="text-yellow-600 hover:text-yellow-900"
                                title="Remove admin"
                              >
                                <i className="fas fa-user-minus"></i>
                              </button>
                            )
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-purple-700">
              System Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-700">Total users</h3>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-700">Admins</h3>
                <p>{adminEmails.length}</p>
                <p className="text-sm text-gray-500 truncate">
                  {adminEmails.join(", ")}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-700">Blocked users</h3>
                <p>{blockedEmails.length}</p>
                <p className="text-sm text-gray-500 truncate">
                  {blockedEmails.length > 0 ? blockedEmails.join(", ") : "None"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
