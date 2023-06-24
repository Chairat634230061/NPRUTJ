import { FC, useState, useEffect } from "react";
import { z } from "zod";

interface MemberProps {
  isEdit: boolean;
  id: number;
  whenSuccess: () => void;
}

const MemberPage: FC<MemberProps> = ({ whenSuccess, id, isEdit }) => {
  useEffect(() => {
    if (isEdit) {
      getMemberById();
    }
  }, []);
  /**
   * define validate object
   */
  const memberForm = z
    .object({
      email: z.string().email(),
      name: z.string().nonempty(),
      password: z.string().min(8),
      rePassword: z.string().min(8),
      role: z.string().nonempty(),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Password don't match",
      path: ["rePassword"],
    });
  type Member = z.infer<typeof memberForm>;
  const [frm, setForm] = useState<Member>({
    email: "",
    name: "",
    password: "",
    rePassword: "",
    role: "ADMIN",
  });

  /**
   * call save api
   */
  const createMember = async () => {
    const resp = await fetch("/api/auth/user", {
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frm),
    });
    if (resp.status === 200) {
      // TODO: close dialog
      whenSuccess();
    } else {
      // TODO: popup error alert box
      console.log(resp.statusText);
    }
  };

  /**
   * call get by id
   */
  const getMemberById = async () => {
    const resp = await fetch("/api/auth/user/" + id, {
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
        "Content-Type": "application/json",
      },
    });
    if (resp.status === 200) {
      const data = await resp.json();
      // setEmail(data["email"]);
      setForm({ ...data, rePassword: data["password"] });
    }
  };

  /**
   * call update api
   */
  const updateMember = async () => {
    const resp = await fetch("/api/auth/user/" + id, {
      method: "PUT",
      headers: {
        Authorization: sessionStorage.getItem("AUTH_TOKEN") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frm),
    });
    if (resp.status === 200) {
      whenSuccess();
    } else {
      // TODO: popup error alert box
      console.log(resp.statusText);
    }
  };

  /**
   * on save click
   */
  const onSaveClick = () => {
    const member = memberForm.safeParse(frm);
    if (member.success) {
      if (isEdit) {
        updateMember();
      } else {
        createMember();
      }
    } else {
      //TODO: popup error alert box
      console.log(member.error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row gap-2 items-center">
          <label className="w-[140px]">Email</label>
          <input
            type="text"
            className="npru-input flex-1"
            value={frm.email}
            onChange={(e) => setForm({ ...frm, email: e.target.value })}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label className="w-[140px]">Name</label>
          <input
            type="text"
            className="npru-input flex-1"
            value={frm.name}
            onChange={(e) => setForm({ ...frm, name: e.target.value })}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label className="w-[140px]">Password</label>
          <input
            type="password"
            className="npru-input flex-1"
            value={frm.password}
            onChange={(e) => setForm({ ...frm, password: e.target.value })}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label className="w-[140px]">Re - Password</label>
          <input
            type="password"
            className="npru-input flex-1"
            value={frm.rePassword}
            onChange={(e) => setForm({ ...frm, rePassword: e.target.value })}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label className="w-[140px]">Role</label>
          <select
            className="npru-input"
            value={frm.role}
            onChange={(e) => setForm({ ...frm, role: e.target.value })}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
        </div>
        <div className="flex flex-row pl-[140px]">
          <button className="save-button flex-1" onClick={onSaveClick}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export { MemberPage };
