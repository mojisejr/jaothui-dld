"use client";
import React, { useState } from "react";
import { createNewMemberInfo } from "~/actions/new-member";
import { useFormStatus } from "react-dom";

import {
  getProvinces,
  getAmphoeFromProvince,
  getDistrictsFromAmphoe,
} from "~/lib/address-helper";

interface NewMemberFormProps {
  userId: string;
}

const NewMemberForm = ({ userId }: NewMemberFormProps) => {
  const createNewMemberInfoWithUserId = createNewMemberInfo.bind(null, userId);

  const [province, setProvince] = useState<string>();
  const [amphoe, setAmphoe] = useState<string>();

  const [farmProvince, setFarmProvince] = useState<string>();
  const [farmAmphoe, setFarmAmphoe] = useState<string>();

  return (
    <form
      action={createNewMemberInfoWithUserId}
      className="grid grid-cols-1 gap-2"
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="form-control">
          <input
            type="text"
            name="firstName"
            className="input input-sm input-bordered"
            placeholder="ชื่อ"
            required
          ></input>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="lastName"
            className="input input-sm input-bordered"
            placeholder="นามสกุล"
            required
          ></input>
        </div>
      </div>
      <div className="form-control">
        <input
          type="text"
          name="tel"
          className="input input-sm input-bordered"
          placeholder="เบอร์โทรศัพท์"
          required
        ></input>
      </div>
      <div className="form-control">
        <label className="label label-text font-semibold text-slate-600">
          ข้อมูลส่วนตัวผู้สมัคร
        </label>
        <input
          type="number"
          name="idCard"
          minLength={13}
          maxLength={13}
          className="input input-sm input-bordered"
          placeholder="เลขบัตรประชาชน (ไม่ต้องเติมขีด)"
          required
        ></input>
      </div>
      <div className="form-group">
        <label className="label label-text font-semibold text-slate-600">
          ที่อยู่
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="text"
              name="address1"
              className="input input-sm input-bordered"
              placeholder="บ้านเลขที่"
              required
            ></input>
          </div>
          <div className="form-control">
            <select
              defaultValue="0"
              name="province"
              className="select select-bordered select-sm"
              onChange={(e) => setProvince(e.target.value)}
              required
            >
              <option disabled value="0">
                จังหวัด
              </option>
              {getProvinces().map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <select
              defaultValue="0"
              name="amphoe"
              className="select select-bordered select-sm"
              onChange={(e) => setAmphoe(e.target.value)}
              required
            >
              <option disabled value="0">
                อำเภอ
              </option>
              {getAmphoeFromProvince(province!).map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <select
              defaultValue="0"
              name="district"
              className="select select-bordered select-sm"
              required
            >
              <option disabled value="0">
                ตำบล
              </option>
              {getDistrictsFromAmphoe(province!, amphoe!).map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="zipcode"
              className="input input-sm input-bordered"
              placeholder="รหัสไปรษณี"
              required
            ></input>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">ข้อมูลฟาร์ม</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="text"
              name="farmName"
              className="input input-sm input-bordered"
              placeholder="ชื่อฟาร์ม"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="farmLogo"
              className="input input-sm input-bordered"
              placeholder="เครื่องหมายฟาร์ม"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="farmAddress1"
              className="input input-sm input-bordered"
              placeholder="ที่ตั้งฟาร์มเลขที่"
              required
            ></input>
          </div>
          <div className="form-control">
            <select
              defaultValue="0"
              name="farmProvince"
              onChange={(e) => setFarmProvince(e.target.value)}
              className="select select-bordered select-sm"
              required
            >
              <option disabled value="0">
                จังหวัด
              </option>
              {getProvinces().map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <select
              defaultValue="0"
              name="farmAmphoe"
              onChange={(e) => setFarmAmphoe(e.target.value)}
              className="select select-bordered select-sm"
              required
            >
              <option disabled value="0">
                อำเภอ
              </option>
              {getAmphoeFromProvince(farmProvince!).map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <select
              defaultValue="0"
              name="farmDistrict"
              className="select select-bordered select-sm"
              required
            >
              <option disabled value="0">
                ตำบล
              </option>
              {getDistrictsFromAmphoe(farmProvince!, farmAmphoe!).map(
                (p, index) => (
                  <option key={index} value={p}>
                    {p}
                  </option>
                ),
              )}
            </select>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="farmZipCode"
              className="input input-sm input-bordered"
              placeholder="รหัสไปรษณี"
              required
            ></input>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">ขนาดฟาร์ม</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="number"
              name="farmSize1"
              placeholder="จำนวนไร่"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="farmSize2"
              placeholder="จำนวนงาน"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="farmSize3"
              placeholder="จำนวนตารางวา"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">
          ชนิดสัตว์ {"(ที่เข้าร่วมสมัคร)"}
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <select
              defaultValue="โคเนื้อ"
              name="animalType"
              className="select select-bordered select-sm"
              required
            >
              <option value="โคเนื้อ">โคเนื้อ</option>
              <option value="โคนม">โคนม</option>
              <option value="กระบือ">กระบือ</option>
              <option value="สุกร">สุกร</option>
              <option value="แพะ">แพะ</option>
              <option value="แกะ">แกะ</option>
              <option value="ไก่พื้นเมือง">ไก่พื้นเมือง</option>
              <option value="ไก่ไข่">ไก่ไข่</option>
              <option value="นกกระทา">นกกระทา</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="animalTypeOther"
              placeholder="อื่นๆ ระบุ"
              className="input input-sm input-bordered"
            ></input>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">
          พันธุ์สัตว์และจำนวนสัตว์ {"(ที่สมัครเข้าร่วม)"}
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="number"
              name="momCount"
              placeholder="จำนวนแม่พันธุ์"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="momBreed"
              placeholder="สายพันธุ์"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="dadCount"
              placeholder="จำนวนพ่อพันธุ์"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="dadBreed"
              placeholder="สายพันธุ์"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="otherAnimalSize"
              placeholder="ขนาดอื่นๆ"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="children"
              placeholder="ลูก"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="totalAnimalInFarm"
              placeholder="จำนวนรวมทั้งสิ้น"
              className="input input-sm input-bordered"
              required
            ></input>
          </div>
        </div>
        <div className="form-group">
          <label className="label label-text">
            วัตถุประสงค์ของฟาร์ม {"(ตอบได้มากกว่า 1 ข้อ)"}
          </label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">ผลิตพันธุ์แท้</span>
              <input
                type="checkbox"
                name="farmObj1"
                className="checkbox"
                value="ผลิตพันธุ์แท้"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">ผลิตลูกผสม</span>
              <input
                type="checkbox"
                className="checkbox"
                name="farmObj2"
                value="ผลิตลูกผสม"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">ผลิตเพื่อขุน</span>
              <input
                type="checkbox"
                name="farmObj3"
                className="checkbox"
                value="ผลิตเพื่อขุน"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">อนุรักษ์</span>
              <input
                type="checkbox"
                className="checkbox"
                value="อนุรักษ์"
                name="farmObj4"
              />
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className="input input-sm input-bordered"
            name="farmObjOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">แปลงหญ้าสำหรับเลี้ยง</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioGrass"
                className="radio"
                value="มี"
              />
              <span className="label-text">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioGrass"
                className="radio"
                value="ไม่มี"
              />
              <span className="label-text">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">แหล่งน้ำที่ใช้เลี้ยงสัตว์</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioWater"
                className="radio"
                value="น้ำประปา"
              />
              <span className="label-text">น้ำประปา</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioWater"
                className="radio"
                value="น้ำบาดาล"
              />
              <span className="label-text">น้ำบาดาล</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioWater"
                className="radio"
                value="น้ำบ่อ"
              />
              <span className="label-text">น้ำบ่อ</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioWater"
                className="radio"
                value="น้ำคลอง/แม่น้ำ"
              />
              <span className="label-text">น้ำคลอง/แม่น้ำ</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className="input input-sm input-bordered"
            name="radioWaterOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">อาหารที่ใช้เลี้ยงสัตว์</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioFood"
                className="radio"
                value="อาหารธรรมชาติ"
              />
              <span className="label-text">อาหารธรรมชาติ</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioFood"
                className="radio"
                value="อาหารสำเร็จรูป"
              />
              <span className="label-text">อาหารสำเร็จรูป</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className="input input-sm input-bordered"
            name="radioFoodOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">วิธีการเลี้ยง</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioTreat"
                className="radio"
                value="ปล่อยแทะเล็ม"
              />
              <span className="label-text">ปล่อยแทะเล็ม</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioTreat"
                className="radio"
                value="ขังคอก/ยืนโรง"
              />
              <span className="label-text">ขังคอก/ยืนโรง</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioTreat"
                className="radio"
                value="กึ่งขังกึ่งปล่อย"
              />
              <span className="label-text">กึ่งขังกึ่งปล่อย</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className="input input-sm input-bordered"
            name="radioTreatOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">ทำทะเบียนประวัติ</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioCertificate"
                className="radio"
                value="มี"
              />
              <span className="label-text">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioCertificate"
                className="radio"
                value="ไม่มี"
              />
              <span className="label-text">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">แหล่งบำบัดของเสียจากฟาร์ม</label>
        <div className="grid grid-cols-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioWaterTreat"
                className="radio"
                value="มี"
              />
              <span className="label-text">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioWaterTreat"
                className="radio"
                value="ไม่มี"
              />
              <span className="label-text">ไม่มี</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-control">
        <label className="label label-text">สถานที่ตั้งฟาร์ม</label>
        <input
          type="text"
          name="farmLocation"
          placeholder="เลือกจากแผนที่"
          className="input input-sm input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label label-text">
          ภาพบัตรประชาชน (เฉพาะด้านหน้า)
        </label>
        <input
          type="file"
          name="idCardImage"
          accept="image/png, image/jpg, image/jpeg"
          className="file-input file-input-bordered file-input-sm"
          required
        />
      </div>
      <div className="form-group">
        <label className="label label-text">ภาพถ่ายฟาร์ม 4 ภาพ</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <input
              type="file"
              name="farmImage1"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="farmImage2"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="farmImage3"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="farmImage4"
              accept="image/png, image/jpg, image/jpeg"
              className="file-input file-input-bordered file-input-sm"
              required
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">
          ข้าพเจ้ามีความประสงค์จะเข้าร่วมโครงการเครือข่ายสัตว์พันธุ์ดีของกรมปศุสัตว์
          ประเภท
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioCategory"
                className="radio"
                value="ใช้ประโยชน์พันธุกรรมและเทคโนโลยี"
              />
              <span className="label-text">
                ใช้ประโยชน์พันธุกรรมและเทคโนโลยี
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioCategory"
                className="radio"
                value="ปรับปรุงพันธุ์และขยายพันธุ์"
              />
              <span className="label-text">ปรับปรุงพันธุ์และขยายพันธุ์</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioCategory"
                className="radio"
                value="อนุรักษ์สัตว์พื้นเมือง"
              />
              <span className="label-text">อนุรักษ์สัตว์พื้นเมือง</span>
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">
          ข้าพเจ้ายินยอมที่จะให้ข้อมูลฟาร์มของข้าพเจ้าแก่กรมปศุสัตว์
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioAccept"
                className="radio"
                value="y"
                required
              />
              <span className="label-accept">ยินยอม</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              <input
                type="radio"
                name="radioAccept"
                className="radio"
                value="n"
                required
              />
              <span className="label-accept">ไม่ยินยอม</span>
            </label>
          </div>
        </div>
      </div>
      <SubmitNewUser />
    </form>
  );
};

const SubmitNewUser = () => {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-secondary rounded-full shadow-xl"
    >
      {!pending ? <span>ยืนยันการลงทะเบียน</span> : <span>กำลังบันทึก...</span>}
    </button>
  );
};

export default NewMemberForm;
