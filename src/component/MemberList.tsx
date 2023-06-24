import { FC, useEffect, useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import { AppDialog } from "../component/AppDialog";
import { MemberPage } from "../component/MemberPage";
import { Confirm } from "../component/Confirm";
import { Alert } from "../component/Alert";

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
}

interface RowProps {
  member: Member;
  whenDelete: (member: Member) => void;
  whenEdit: (member: Member) => void;
}

const MemberRow: FC<RowProps> = ({ member, whenEdit, whenDelete }) => {
  const [showMember, setShowMember] = useState(false);
  return (
    <>
      <tr
        key={member.id}
        className="odd:bg-gray-100 bg-gray-200 hover:bg-blue-200 h-12"
      >
        <td className="text-center">
          <div className="flex flex-row gap-2 justify-center">
            <PencilSquareIcon
              className="w-6 h-6 hover:text-yellow-400 text-black cursor-pointer"
              onClick={() => whenEdit(member)}
            />
            <div>{member.id}</div>
          </div>
        </td>
        <td>{member.name}</td>
        <td>{member.email}</td>
        <td>
          <div
            className="flex flex-row gap-2"
            onMouseOver={() => setShowMember(true)}
            onMouseOut={() => setShowMember(false)}
          >
            {!showMember && (
              <EyeIcon
                className="w-6 h-6 text-green-300"
                onClick={() => setShowMember(true)}
              />
            )}
            {showMember && (
              <EyeSlashIcon
                className="w-6 h-6 text-yellow-300"
                onClick={() => setShowMember(false)}
              />
            )}
            <div>{showMember && member.password}</div>
          </div>
        </td>
        <td className="text-center">{member.role}</td>
        <td className="">
          <div className="flex flex-row justify-center">
            <TrashIcon
              className="w-6 h-6 hover:text-red-500 text-black cursor-pointer"
              onClick={() => whenDelete(member)}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

interface ToobarProps {
  whenAdd: () => void;
  whenRefresh: () => void;
}

const MemberToolbar: FC<ToobarProps> = ({ whenAdd, whenRefresh }) => {
  return (
    <>
      <div className="flex flex-row gap-2  p-2">
        <button className="save-button w-[120px]" onClick={whenAdd}>
          <div className="flex flex-row gap-2 justify-center">
            <PlusCircleIcon className="w-6 h-6 text-white" />
            <span>Add</span>
          </div>
        </button>
        <button className="save-button w-[120px]" onClick={whenRefresh}>
          <div className="flex flex-row gap-2 justify-center">
            <ArrowPathIcon className="w-6 h-6 text-white" />
            <span>Refresh</span>
          </div>
        </button>
      </div>
    </>
  );
};

const MemberList: FC = () => {
  /**
   * load data when component loaded
   */
  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * data state
   */
  const [member, setMember] = useState([]);
  const [show, setShow] = useState(false);
  // for confirm dialog
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  // for alert dialog
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  // tempory for delete member
  const [currentMember, setCurrentMember] = useState<Member>();

  // temporary for edit member
  const [id, setId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  /**
   * Fetch data from user api
   */
  const fetchUser = async () => {
    const resp = await fetch("/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
        "Content-Type": "application/json",
      },
    });
    if (resp.status === 200) {
      const data = await resp.json();
      setMember(data);
    }
  };

  /**
   * save success callback
   */
  const saveSuccess = () => {
    setShow(false);
    fetchUser();
  };

  /**
   * delete user callback
   */
  const deleteUser = (member: Member) => {
    setConfirmTitle("Please confirm to delete");
    setConfirmMessage(`Are you sure to delete ${member.name} from databse ?`);
    setShowConfirm(true);
    setCurrentMember(member);
  };

  /**
   * edit user callback
   */
  const editUser = (member: Member) => {
    setId(member.id);
    setIsEdit(true);
    setShow(true);
  };

  /**
   * confirm to delete
   */
  const confirmDelete = async () => {
    const resp = await fetch("/api/auth/user/" + currentMember?.id, {
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
        "Content-Type": "application/json",
      },
    });
    if (resp.status === 200) {
      fetchUser();
      setAlertTitle("Delete success");
      setAlertMessage("Delete user from database success !!");
      setShowAlert(true);
    } else {
      setAlertTitle("Delete error");
      setAlertMessage(resp.statusText);
      setShowAlert(true);
    }
  };
  /**
   * whenAddClick
   */
  const whenAddClick = () => {
    setIsEdit(false);
    setShow(true);
  };
  return (
    <>
      <MemberToolbar whenAdd={whenAddClick} whenRefresh={fetchUser} />
      <div className="border rounded-md overflow-auto h-96 bg-white">
        <table className="w-full">
          <thead className="h-12 sticky top-0">
            <tr className="bg-[#6633cc] p-4 text-white border border-white">
              <th className="border border-white">ID</th>
              <th className="w-[150px] border border-white">Name</th>
              <th className="border border-white">Email</th>
              <th className="border border-white">Password</th>
              <th className="border border-white">Role</th>
              <th className="border border-white">Delete</th>
            </tr>
          </thead>
          <tbody className="max-h-96">
            {member.map((m: Member) => (
              <MemberRow
                member={m}
                key={m.id}
                whenEdit={editUser}
                whenDelete={deleteUser}
              />
            ))}
          </tbody>
        </table>
      </div>
      <AppDialog title="Member Page" show={show} setShow={setShow}>
        <MemberPage whenSuccess={saveSuccess} id={id} isEdit={isEdit} />
      </AppDialog>
      <Confirm
        title={confirmTitle}
        message={confirmMessage}
        show={showConfirm}
        setShow={setShowConfirm}
        whenOK={confirmDelete}
      />
      <Alert
        title={alertTitle}
        message={alertMessage}
        show={showAlert}
        setShow={setShowAlert}
      />
    </>
  );
};

export { MemberList };
