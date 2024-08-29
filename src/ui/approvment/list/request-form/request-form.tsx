import Link from "next/link";
import React from "react";
import { confirmAppointmemt, getApprovementInfoOf } from "~/actions/approvment";
import dayjs from "dayjs";
import Image from "next/image";
import SubmitAppointment from "./submit-appointment-btn";

interface RequestFormProps {
  requestId: string;
  adminId: string;
  level: string;
}

const RequestForm = async ({ requestId, adminId, level }: RequestFormProps) => {
  const confirmAppointmentWithMetadata = confirmAppointmemt.bind(
    null,
    requestId,
  );
  const info = await getApprovementInfoOf(requestId);
  return (
    <form
      action={confirmAppointmentWithMetadata}
      className="grid grid-cols-1 gap-2"
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="form-control">
          <input
            type="text"
            name="firstName"
            className="input input-sm input-bordered"
            placeholder="ชื่อ"
            value={info?.firstname}
            readOnly
          ></input>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="lastName"
            className="input input-sm input-bordered"
            placeholder="นามสกุล"
            value={info?.lastname}
            readOnly
          ></input>
        </div>
      </div>
      <div className="form-control">
        <input
          type="text"
          name="tel"
          className="input input-sm input-bordered"
          placeholder="เบอร์โทรศัพท์"
          readOnly
          value={info?.tel}
        ></input>
      </div>
      <div className="form-control">
        <label className="label label-text font-semibold text-slate-600">
          ข้อมูลส่วนตัวผู้สมัคร
        </label>
        <input
          type="number"
          name="idCard"
          className="input input-sm input-bordered"
          placeholder="เลขบัตรประชาชน (ไม่ต้องเติมขีด)"
          value={info?.idCard.toString()}
          readOnly
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
              value={info?.address1}
              readOnly
            ></input>
          </div>
          <div className="form-control">
            <input
              name="province"
              className="select select-bordered select-sm"
              value={info?.province}
              readOnly
            />
          </div>
          <div className="form-control">
            <input
              name="amphoe"
              className="select select-bordered select-sm"
              value={info?.amphoe}
              readOnly
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="district"
              className="select select-bordered select-sm"
              value={info?.district}
              readOnly
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="zipcode"
              className="input input-sm input-bordered"
              placeholder="รหัสไปรษณี"
              readOnly
              value={info?.zipcode}
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
              readOnly
              value={info?.farmName}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="farmLogo"
              className="input input-sm input-bordered"
              placeholder="เครื่องหมายฟาร์ม"
              readOnly
              value={info?.farmLogo}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="farmAddress1"
              className="input input-sm input-bordered"
              placeholder="ที่ตั้งฟาร์มเลขที่"
              readOnly
              value={info?.farmAddress}
            ></input>
          </div>
          <div className="form-control">
            <input
              name="farmProvince"
              className="select select-bordered select-sm"
              readOnly
              value={info?.farmProvince}
            ></input>
          </div>
          <div className="form-control">
            <input
              name="farmAmphoe"
              className="select select-bordered select-sm"
              readOnly
              value={info?.farmAmphoe}
            ></input>
          </div>
          <div className="form-control">
            <input
              name="farmDistrict"
              className="select select-bordered select-sm"
              readOnly
              value={info?.farmDistrict}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="farmZipCode"
              className="input input-sm input-bordered"
              placeholder="รหัสไปรษณี"
              readOnly
              value={info?.farmZipcode.toString()}
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
              readOnly
              value={info?.farmSize1}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="farmSize2"
              placeholder="จำนวนงาน"
              className="input input-sm input-bordered"
              readOnly
              value={info?.farmSize2}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="farmSize3"
              placeholder="จำนวนตารางวา"
              className="input input-sm input-bordered"
              readOnly
              value={info?.farmSize3}
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
            <input
              defaultValue="โคเนื้อ"
              name="animalType"
              className="select select-bordered select-sm"
              readOnly
              value={info?.animalType}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="animalTypeOther"
              placeholder="อื่นๆ ระบุ"
              className="input input-sm input-bordered"
              readOnly
              value={info?.animalTypeOther?.toString()}
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
              readOnly
              value={info?.momCount}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="momBreed"
              placeholder="สายพันธุ์"
              className="input input-sm input-bordered"
              readOnly
              value={info?.momBreed}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="dadCount"
              placeholder="จำนวนพ่อพันธุ์"
              className="input input-sm input-bordered"
              readOnly
              value={info?.dadCount}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="dadBreed"
              placeholder="สายพันธุ์"
              className="input input-sm input-bordered"
              readOnly
              value={info?.dadBreed}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              name="otherAnimalSize"
              placeholder="ขนาดอื่นๆ"
              className="input input-sm input-bordered"
              readOnly
              value={info?.dadCount}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="children"
              placeholder="ลูก"
              className="input input-sm input-bordered"
              readOnly
              value={info?.children}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="totalAnimalInFarm"
              placeholder="จำนวนรวมทั้งสิ้น"
              className="input input-sm input-bordered"
              readOnly
              value={info?.totalAnimalInFarm}
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
                readOnly
                checked={info?.farmObj1 != null}
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
                readOnly
                checked={info?.farmObj2 != null}
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
                readOnly
                checked={info?.farmObj3 != null}
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
                readOnly
                checked={info?.farmObj4 != null}
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
            readOnly
            value={info?.farmObjOther?.toString()}
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
                checked={info?.grassField == "มี"}
                readOnly
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
                readOnly
                checked={info?.grassField == "ไม่มี"}
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
                readOnly
                checked={info?.water == "น้ำประปา"}
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
                readOnly
                checked={info?.water == "น้ำบาดาล"}
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
                readOnly
                checked={info?.water == "น้ำบ่อ"}
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
                checked={info?.water == "น้ำตลอง/แม่น้ำ"}
                readOnly
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
            readOnly
            checked={info?.water == "อื่นๆ ระบุ"}
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
                readOnly
                checked={info?.food == "อาหารธรรมชาติ"}
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
                readOnly
                checked={info?.food == "อาหารสำเร็จรูป"}
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
            readOnly
            value={info?.foodOther?.toString()}
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
                readOnly
                checked={info?.treat == "ปล่อยแทะเล็ม"}
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
                readOnly
                checked={info?.treat == "ขังคอก/ยืนโรง"}
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
                readOnly
                checked={info?.treat == "กึ่งขังกึ่งปล่อย"}
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
            readOnly
            value={info?.treatOther?.toString()}
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
                readOnly
                checked={info?.certificate == "มี"}
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
                readOnly
                checked={info?.certificate == "ไม่มี"}
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
                readOnly
                checked={info?.waterTreat == "มี"}
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
                readOnly
                checked={info?.certificate == "ไม่มี"}
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
          readOnly
          value={info?.farmLocation}
        />
      </div>
      <div className="form-control">
        <label className="label label-text">
          ภาพบัตรประชาชน (เฉพาะด้านหน้า)
        </label>
        <figure className="flex w-full justify-center">
          <Image
            className="max-w-64 rounded-xl"
            src={info?.idCardImage ?? "/images/logo.png"}
            width={1000}
            height={760}
            alt="id-card-image"
          />
        </figure>
      </div>
      <div className="form-group">
        <label className="label label-text">ภาพถ่ายฟาร์ม 4 ภาพ</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <figure className="flex w-full justify-center">
              <Image
                className="max-w-64 rounded-xl"
                src={info?.farmImage1 ?? "/images/logo.png"}
                width={1000}
                height={760}
                alt="id-card-image"
              />
            </figure>
          </div>
          <div className="form-control">
            <figure className="flex w-full justify-center">
              <Image
                className="max-w-64 rounded-xl"
                src={info?.farmImage2 ?? "/images/logo.png"}
                width={1000}
                height={760}
                alt="id-card-image"
              />
            </figure>
          </div>
          <div className="form-control">
            <figure className="flex w-full justify-center">
              <Image
                className="max-w-64 rounded-xl"
                src={info?.farmImage3 ?? "/images/logo.png"}
                width={1000}
                height={760}
                alt="id-card-image"
              />
            </figure>
          </div>
          <div className="form-control">
            <figure className="flex w-full justify-center">
              <Image
                className="max-w-64 rounded-xl"
                src={info?.farmImage4 ?? "/images/logo.png"}
                width={1000}
                height={760}
                alt="id-card-image"
              />
            </figure>
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
                readOnly
                checked={
                  info?.certificate == "ใช้ประโยชน์พันธุกรรมและเทคโนโลยี"
                }
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
                readOnly
                checked={info?.category == "ปรับปรุงพันธุ์และขยายพันธุ์"}
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
                readOnly
                checked={info?.category == "อนุรักษ์สัตว์พื้นเมือง"}
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
                readOnly
                checked={info?.accept == "y"}
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
                readOnly
                checked={info?.accept == "n"}
              />
              <span className="label-accept">ไม่ยินยอม</span>
            </label>
          </div>
        </div>
      </div>
      {level == "1" && info?.appointment == null ? (
        <>
          <div className="form-control">
            <label className="label label-text text-xl font-bold">
              นัดวันเพื่อประเมินคำร้อง (จนท.ระดับจังหวัดระบุ)
            </label>
            <input
              name="appointment"
              type="date"
              className="input input-bordered"
              required
            />
          </div>
          <SubmitAppointment />
          <Link
            className="btn btn-neutral rounded-full"
            href="/approvement/list"
          >
            กลับ
          </Link>
        </>
      ) : (
        <>
          <div className="text-erro w-full text-center font-bold">
            นัดวันประเมิณ{" "}
            {info?.appointment == null ? (
              <span className="text-error">ยังไม่มีการนัด</span>
            ) : (
              dayjs(info?.appointment).format("DD/MM/YYYY")
            )}
          </div>
          <Link
            className="btn btn-secondary rounded-full"
            href="/approvement/list"
          >
            กลับ
          </Link>
        </>
      )}
    </form>
  );
};

export default RequestForm;
