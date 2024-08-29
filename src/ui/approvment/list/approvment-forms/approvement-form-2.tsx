"use client";
import { type RawRegisterData } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { handleConfirmEdit } from "~/actions/edit-member-info";

interface ApprovementForm2Props {
  approvementInfo: RawRegisterData;
  adminId: string;
  level: string;
}

const ApprovementForm2 = ({
  approvementInfo,
  adminId,
  level,
}: ApprovementForm2Props) => {
  const info = approvementInfo;
  const confirmEditWithInfo = handleConfirmEdit.bind(null, info);

  return (
    <form action={confirmEditWithInfo} className="grid grid-cols-1 gap-2">
      <div className="form-group">
        <label className="label label-text">แปลงหญ้าสำหรับสัตว์เลี้ยง</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="file"
              name="grassImage1"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="grassImage2"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="grassImage3"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">ภาชนะใส่อาหาร</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioFeedingBowl"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioFeedingBowl"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className="input input-sm input-bordered"
            name="radioFeedingBowlOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">โรงเรือนเลี้ยงสัตว์</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioHousing"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioHousing"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className="input input-sm input-bordered"
            name="radioHousingOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">ภาชนะบรรจุน้ำ</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioWaterBowl"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioWaterBowl"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className="input input-sm input-bordered"
            name="radioWaterBowlOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">แหล่งน้ำที่ใช้เลี้ยงสัตว์</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="file"
              name="waterSourceImage1"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="waterSourceImage2"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">อาหารที่ใช้เลี้ยงสัตว์</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="file"
              name="foodImage1"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="foodImage2"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">วิธีการเลี้ยง</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="file"
              name="treatMethodImage1"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="treatMethodImage2"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="treatMethodImage3"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">แหล่งบำบัดของเสียจากฟาร์ม</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="file"
              name="wasteImage1"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="wasteImage2"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">เครื่องหมายประจำตัวสัตว์</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioTag"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioTag"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">พันธุ์ประวัติ และการผสม</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioCertify"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioCertify"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">
          ผลผลิต (น้ำหนัก รอบอก การฟักไข่ อื่นๆ)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioProduct"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioProduct"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">
          สุขภาพสัตว์ การรักษาโรค การป้องกันควบคุมโรค
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioHealthCare"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioHealthCare"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">การจัดการอาหารสัตว์</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioFoodManage"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioFoodManage"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">การซื้อ/ขาย/ถ่าย/โอน สัตว์</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioMarket"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioMarket"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">การประเมินของเจ้าหน้าที่</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioTag"
                className="radio"
                value="มี"
                required
              />
              <span className="label-accept">ผ่าน</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioTag"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่ผ่าน</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-control">
        <textarea
          rows={5}
          className="textarea textarea-bordered"
          name="note"
          placeholder="หมายเหตุ"
        ></textarea>
      </div>
      <div className="flex w-full justify-between py-2">
        <Link
          href={`/approvement/approve/${info?.id}?step=0`}
          className="btn btn-secondary min-w-[100px] rounded-full shadow-xl"
        >
          กลับ
        </Link>
        <Link
          href="/approvement/approve/success"
          className="btn btn-success rounded-full text-white shadow-xl"
        >
          ยืนยันการประเมิณ
        </Link>
      </div>
    </form>
  );
};

export default ApprovementForm2;
