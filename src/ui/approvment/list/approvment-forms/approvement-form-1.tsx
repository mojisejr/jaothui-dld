"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  getProvinces,
  getAmphoeFromProvince,
  getDistrictsFromAmphoe,
} from "~/lib/address-helper";

import Image from "next/image";
import { handleConfirmEdit } from "~/actions/edit-member-info";
import { type RawRegisterData } from "@prisma/client";

interface ApprovementForm1Props {
  approvementInfo: RawRegisterData;
  adminId: string;
  level: string;
}

const ApprovementForm1 = ({
  approvementInfo,
  adminId,
  level,
}: ApprovementForm1Props) => {
  const [province, setProvince] = useState<string>();
  const [amphoe, setAmphoe] = useState<string>();

  const [farmProvince, setFarmProvince] = useState<string>();
  const [farmAmphoe, setFarmAmphoe] = useState<string>();

  const [edit, setEdit] = useState<boolean>(true);
  const info = approvementInfo;
  const confirmEditWithInfo = handleConfirmEdit.bind(null, info);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <form action={confirmEditWithInfo} className="grid grid-cols-1 gap-2">
      <div className="w-full">
        <button
          type="button"
          onClick={() => handleEdit()}
          className={`btn ${edit ? "btn-info" : "btn-secondary"} w-full rounded-full`}
        >
          {edit ? "แก้ไขข้อมูล" : "ยกเลิกการแก้ไข"}
        </button>
      </div>
      <div className="form-control">
        <div className="flex justify-between gap-2">
          {edit ? (
            <input
              type="text"
              name="firstName"
              className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
              placeholder="ชื่อ"
              value={info?.firstname}
              readOnly={edit}
            ></input>
          ) : (
            <input
              type="text"
              name="firstName"
              className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
              placeholder={info?.firstname}
              readOnly={edit}
            ></input>
          )}
        </div>
      </div>
      <div className="form-control">
        {edit ? (
          <input
            type="text"
            name="lastName"
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            placeholder="นามสกุล"
            value={info?.lastname}
            readOnly={edit}
          ></input>
        ) : (
          <input
            type="text"
            name="lastName"
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            placeholder={info?.lastname}
            readOnly={edit}
          ></input>
        )}
      </div>
      <div className="form-control">
        {edit ? (
          <input
            type="text"
            name="tel"
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            placeholder="เบอร์โทรศัพท์"
            readOnly={edit}
            value={info?.tel}
          ></input>
        ) : (
          <input
            type="text"
            name="tel"
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            placeholder={info?.tel}
            readOnly={edit}
          ></input>
        )}
      </div>
      <div className="form-control">
        <label className="label label-text font-semibold text-slate-600">
          ข้อมูลส่วนตัวผู้สมัคร
        </label>
        {edit ? (
          <input
            type="number"
            name="idCard"
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            placeholder="เลขบัตรประชาชน (ไม่ต้องเติมขีด)"
            value={info?.idCard.toString()}
            readOnly={edit}
          ></input>
        ) : (
          <input
            type="number"
            name="idCard"
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            placeholder={info?.idCard.toString()}
            readOnly={edit}
          ></input>
        )}
      </div>
      <div className="form-group">
        <label className="label label-text font-semibold text-slate-600">
          ที่อยู่
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="address1"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder="บ้านเลขที่"
                value={info?.address1}
                readOnly={edit}
              ></input>
            ) : (
              <input
                type="text"
                name="address1"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder={info?.address1}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                name="province"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
                value={info?.province}
                readOnly={edit}
              />
            ) : (
              <select
                defaultValue="0"
                name="province"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
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
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                name="amphoe"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
                value={info?.amphoe}
                readOnly={edit}
              ></input>
            ) : (
              <select
                defaultValue="0"
                name="amphoe"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
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
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="district"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
                value={info?.district}
                readOnly={edit}
              ></input>
            ) : (
              <select
                defaultValue="0"
                name="district"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
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
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="zipcode"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder="รหัสไปรษณี"
                readOnly={edit}
                value={info?.zipcode}
              ></input>
            ) : (
              <input
                type="number"
                name="zipcode"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder={info?.zipcode}
                readOnly={edit}
              ></input>
            )}
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">ข้อมูลฟาร์ม</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="farmName"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder="ชื่อฟาร์ม"
                readOnly={edit}
                value={info?.farmName}
              ></input>
            ) : (
              <input
                type="text"
                name="farmName"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder={info?.farmName}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="farmLogo"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder="เครื่องหมายฟาร์ม"
                readOnly={edit}
                value={info?.farmLogo}
              ></input>
            ) : (
              <input
                type="text"
                name="farmLogo"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder={info?.farmLogo}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="farmAddress1"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder="ที่ตั้งฟาร์มเลขที่"
                readOnly={edit}
                value={info?.farmAddress}
              ></input>
            ) : (
              <input
                type="text"
                name="farmAddress1"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder={info?.farmAddress}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                name="farmProvince"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
                readOnly={edit}
                value={info?.farmProvince}
              ></input>
            ) : (
              <select
                defaultValue="0"
                name="farmProvince"
                onChange={(e) => setFarmProvince(e.target.value)}
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
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
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                name="farmAmphoe"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
                readOnly={edit}
                value={info?.farmAmphoe}
              ></input>
            ) : (
              <select
                defaultValue="0"
                name="farmAmphoe"
                onChange={(e) => setFarmAmphoe(e.target.value)}
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
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
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                name="farmDistrict"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
                readOnly={edit}
                value={info?.farmDistrict}
              ></input>
            ) : (
              <select
                defaultValue="0"
                name="farmDistrict"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
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
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="farmZipCode"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder="รหัสไปรษณี"
                readOnly={edit}
                value={info?.farmZipcode.toString()}
              ></input>
            ) : (
              <input
                type="number"
                name="farmZipCode"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                placeholder={info?.farmZipcode}
                readOnly={edit}
              ></input>
            )}
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">ขนาดฟาร์ม</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="farmSize1"
                placeholder="จำนวนไร่"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.farmSize1}
              ></input>
            ) : (
              <input
                type="number"
                name="farmSize1"
                placeholder={info?.farmSize1.toString()}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="farmSize2"
                placeholder="จำนวนงาน"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.farmSize2}
              ></input>
            ) : (
              <input
                type="number"
                name="farmSize2"
                placeholder={info?.farmSize2.toString()}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="farmSize3"
                placeholder="จำนวนตารางวา"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.farmSize3}
              ></input>
            ) : (
              <input
                type="number"
                name="farmSize3"
                placeholder={info?.farmSize3.toString()}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">
          ชนิดสัตว์ {"(ที่เข้าร่วมสมัคร)"}
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            {edit ? (
              <input
                defaultValue="โคเนื้อ"
                name="animalType"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
                readOnly={edit}
                value={info?.animalType}
              ></input>
            ) : (
              <select
                defaultValue="โคเนื้อ"
                className={`select select-bordered select-sm ${edit ? null : "select-primary"}`}
                name="animalType"
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
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="animalTypeOther"
                placeholder="อื่นๆ ระบุ"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.animalTypeOther?.toString()}
              ></input>
            ) : (
              <input
                type="text"
                name="animalTypeOther"
                placeholder={info?.animalTypeOther ?? "N/A"}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">
          พันธุ์สัตว์และจำนวนสัตว์ {"(ที่สมัครเข้าร่วม)"}
        </label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="momCount"
                placeholder="จำนวนแม่พันธุ์"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.momCount}
              ></input>
            ) : (
              <input
                type="number"
                name="momCount"
                placeholder={info?.momCount.toString()}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="momBreed"
                placeholder="สายพันธุ์"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.momBreed}
              ></input>
            ) : (
              <input
                type="text"
                name="momBreed"
                placeholder={info.momBreed}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="dadCount"
                placeholder="จำนวนพ่อพันธุ์"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.dadCount}
              ></input>
            ) : (
              <input
                type="number"
                name="dadCount"
                placeholder={info?.dadCount.toString()}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="dadBreed"
                placeholder="สายพันธุ์"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.dadBreed}
              ></input>
            ) : (
              <input
                type="text"
                name="dadBreed"
                placeholder={info?.dadBreed}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="text"
                name="otherAnimalSize"
                placeholder="ขนาดอื่นๆ"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.dadCount}
              ></input>
            ) : (
              <input
                type="text"
                name="otherAnimalSize"
                placeholder={info?.dadCount.toString()}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="children"
                placeholder="ลูก"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.children}
              ></input>
            ) : (
              <input
                type="number"
                name="children"
                placeholder={info?.children.toString(0)}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
          <div className="form-control">
            {edit ? (
              <input
                type="number"
                name="totalAnimalInFarm"
                placeholder="จำนวนรวมทั้งสิ้น"
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
                value={info?.totalAnimalInFarm}
              ></input>
            ) : (
              <input
                type="number"
                name="totalAnimalInFarm"
                placeholder={info?.totalAnimalInFarm.toString()}
                className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
                readOnly={edit}
              ></input>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="label label-text">
            วัตถุประสงค์ของฟาร์ม {"(ตอบได้มากกว่า 1 ข้อ)"}
          </label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">ผลิตพันธุ์แท้</span>
              {edit ? (
                <input
                  type="checkbox"
                  name="farmObj1"
                  className="checkbox"
                  value="ผลิตพันธุ์แท้"
                  readOnly={edit}
                  checked={info?.farmObj1 != null}
                />
              ) : (
                <input
                  type="checkbox"
                  name="farmObj1"
                  className="checkbox"
                  value="ผลิตพันธุ์แท้"
                />
              )}
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">ผลิตลูกผสม</span>
              {edit ? (
                <input
                  type="checkbox"
                  className="checkbox"
                  name="farmObj2"
                  value="ผลิตลูกผสม"
                  readOnly={edit}
                  checked={info?.farmObj2 != null}
                />
              ) : (
                <input
                  type="checkbox"
                  className="checkbox"
                  name="farmObj2"
                  value="ผลิตลูกผสม"
                />
              )}
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">ผลิตเพื่อขุน</span>
              {edit ? (
                <input
                  type="checkbox"
                  name="farmObj3"
                  className="checkbox"
                  value="ผลิตเพื่อขุน"
                  readOnly={edit}
                  checked={info?.farmObj3 != null}
                />
              ) : (
                <input
                  type="checkbox"
                  name="farmObj3"
                  className="checkbox"
                  value="ผลิตเพื่อขุน"
                />
              )}
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">อนุรักษ์</span>
              {edit ? (
                <input
                  type="checkbox"
                  className="checkbox"
                  value="อนุรักษ์"
                  name="farmObj4"
                  readOnly={edit}
                  checked={info?.farmObj4 != null}
                />
              ) : (
                <input
                  type="checkbox"
                  className="checkbox"
                  value="อนุรักษ์"
                  name="farmObj4"
                />
              )}
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            name="farmObjOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
            readOnly={edit}
            value={info?.farmObjOther?.toString()}
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">แปลงหญ้าสำหรับเลี้ยง</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioGrass"
                  className="radio"
                  checked={info?.grassField == "มี"}
                  readOnly={edit}
                  value="มี"
                />
              ) : (
                <input
                  type="radio"
                  name="radioGrass"
                  className="radio"
                  value="มี"
                />
              )}
              <span className="label-text">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioGrass"
                  className="radio"
                  value="ไม่มี"
                  readOnly={edit}
                  checked={info?.grassField == "ไม่มี"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioGrass"
                  className="radio"
                  value="ไม่มี"
                />
              )}
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
              {edit ? (
                <input
                  type="radio"
                  name="radioWater"
                  className="radio"
                  value="น้ำประปา"
                  readOnly={edit}
                  checked={info?.water == "น้ำประปา"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioWater"
                  className="radio"
                  value="น้ำประปา"
                />
              )}
              <span className="label-text">น้ำประปา</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioWater"
                  className="radio"
                  value="น้ำบาดาล"
                  readOnly={edit}
                  checked={info?.water == "น้ำบาดาล"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioWater"
                  className="radio"
                  value="น้ำบาดาล"
                />
              )}
              <span className="label-text">น้ำบาดาล</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioWater"
                  className="radio"
                  value="น้ำบ่อ"
                  readOnly={edit}
                  checked={info?.water == "น้ำบ่อ"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioWater"
                  className="radio"
                  value="น้ำบ่อ"
                />
              )}
              <span className="label-text">น้ำบ่อ</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioWater"
                  className="radio"
                  value="น้ำคลอง/แม่น้ำ"
                  checked={info?.water == "น้ำตลอง/แม่น้ำ"}
                  readOnly={edit}
                />
              ) : (
                <input
                  type="radio"
                  name="radioWater"
                  className="radio"
                  value="น้ำคลอง/แม่น้ำ"
                />
              )}
              <span className="label-text">น้ำคลอง/แม่น้ำ</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            name="radioWaterOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
            readOnly={edit}
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">อาหารที่ใช้เลี้ยงสัตว์</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioFood"
                  className="radio"
                  value="อาหารธรรมชาติ"
                  readOnly={edit}
                  checked={info?.food == "อาหารธรรมชาติ"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioFood"
                  className="radio"
                  value="อาหารธรรมชาติ"
                />
              )}
              <span className="label-text">อาหารธรรมชาติ</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioFood"
                  className="radio"
                  value="อาหารสำเร็จรูป"
                  readOnly={edit}
                  checked={info?.food == "อาหารสำเร็จรูป"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioFood"
                  className="radio"
                  value="อาหารสำเร็จรูป"
                />
              )}
              <span className="label-text">อาหารสำเร็จรูป</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          <input
            className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
            name="radioFoodOther"
            type="text"
            placeholder="อื่นๆ ระบุ"
            readOnly={edit}
            value={info?.foodOther?.toString()}
          ></input>
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">วิธีการเลี้ยง</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioTreat"
                  className="radio"
                  value="ปล่อยแทะเล็ม"
                  readOnly={edit}
                  checked={info?.treat == "ปล่อยแทะเล็ม"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioTreat"
                  className="radio"
                  value="ปล่อยแทะเล็ม"
                />
              )}
              <span className="label-text">ปล่อยแทะเล็ม</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioTreat"
                  className="radio"
                  value="ขังคอก/ยืนโรง"
                  readOnly={edit}
                  checked={info?.treat == "ขังคอก/ยืนโรง"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioTreat"
                  className="radio"
                  value="ขังคอก/ยืนโรง"
                />
              )}
              <span className="label-text">ขังคอก/ยืนโรง</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioTreat"
                  className="radio"
                  value="กึ่งขังกึ่งปล่อย"
                  readOnly={edit}
                  checked={info?.treat == "กึ่งขังกึ่งปล่อย"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioTreat"
                  className="radio"
                  value="กึ่งขังกึ่งปล่อย"
                />
              )}
              <span className="label-text">กึ่งขังกึ่งปล่อย</span>
            </label>
          </div>
        </div>
        <div className="form-control">
          {edit ? (
            <input
              className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
              name="radioTreatOther"
              type="text"
              placeholder="อื่นๆ ระบุ"
              readOnly={edit}
              value={info?.treatOther?.toString()}
            ></input>
          ) : (
            <input
              className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
              name="radioTreatOther"
              type="text"
              placeholder="อื่นๆ ระบุ"
            ></input>
          )}
        </div>
      </div>
      <div className="form-group">
        <label className="label label-text">ทำทะเบียนประวัติ</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioCertificate"
                  className="radio"
                  value="มี"
                  readOnly={edit}
                  checked={info?.certificate == "มี"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioCertificate"
                  className="radio"
                  value="มี"
                />
              )}
              <span className="label-text">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioCertificate"
                  className="radio"
                  value="ไม่มี"
                  readOnly={edit}
                  checked={info?.certificate == "ไม่มี"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioCertificate"
                  className="radio"
                  value="ไม่มี"
                />
              )}
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
              {edit ? (
                <input
                  type="radio"
                  name="radioWaterTreat"
                  className="radio"
                  value="มี"
                  readOnly={edit}
                  checked={info?.waterTreat == "มี"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioWaterTreat"
                  className="radio"
                  value="มี"
                />
              )}
              <span className="label-text">มี</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioWaterTreat"
                  className="radio"
                  value="ไม่มี"
                  readOnly={edit}
                  checked={info?.certificate == "ไม่มี"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioWaterTreat"
                  className="radio"
                  value="ไม่มี"
                />
              )}
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
          className={`input input-sm input-bordered w-full ${edit ? null : "input-primary"}`}
          readOnly={edit}
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
            src={info?.idCardImage}
            width={1000}
            height={760}
            alt="id-card-image"
          />
        </figure>
        {edit ? null : (
          <input
            type="file"
            name="idCardImage"
            accept="image/png, image/jpg, image/jpeg"
            className="file-input file-input-bordered file-input-sm mt-2"
          />
        )}
      </div>
      <div className="form-group">
        <label className="label label-text">ภาพถ่ายฟาร์ม 4 ภาพ</label>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <figure className="flex w-full justify-center">
              <Image
                className="max-w-64 rounded-xl"
                src={info?.farmImage1}
                width={1000}
                height={760}
                alt="id-card-image"
              />
            </figure>
            {edit ? null : (
              <input
                type="file"
                name="farmImage1"
                accept="image/png, image/jpg, image/jpeg"
                className="file-input file-input-bordered file-input-sm mt-2"
              />
            )}
          </div>
          <div className="form-control">
            <figure className="flex w-full justify-center">
              <Image
                className="max-w-64 rounded-xl"
                src={info?.farmImage2}
                width={1000}
                height={760}
                alt="id-card-image"
              />
            </figure>
            {edit ? null : (
              <input
                type="file"
                name="farmImage2"
                accept="image/png, image/jpg, image/jpeg"
                className="file-input file-input-bordered file-input-sm mt-2"
              />
            )}
          </div>
          <div className="form-control">
            <figure className="flex w-full justify-center">
              <Image
                className="max-w-64 rounded-xl"
                src={info?.farmImage3}
                width={1000}
                height={760}
                alt="id-card-image"
              />
            </figure>
            {edit ? null : (
              <input
                type="file"
                name="farmImage3"
                accept="image/png, image/jpg, image/jpeg"
                className="file-input file-input-bordered file-input-sm mt-2"
              />
            )}
          </div>
          <div className="form-control">
            <figure className="flex w-full justify-center">
              <Image
                className="max-w-64 rounded-xl"
                src={info?.farmImage4}
                width={1000}
                height={760}
                alt="id-card-image"
              />
            </figure>
            {edit ? null : (
              <input
                type="file"
                name="farmImage4"
                accept="image/png, image/jpg, image/jpeg"
                className="file-input file-input-bordered file-input-sm mt-2"
              />
            )}
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
              {edit ? (
                <input
                  type="radio"
                  name="radioCategory"
                  className="radio"
                  value="ใช้ประโยชน์พันธุกรรมและเทคโนโลยี"
                  readOnly={edit}
                  checked={info?.category == "ใช้ประโยชน์พันธุกรรมและเทคโนโลยี"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioCategory"
                  className="radio"
                  value="ใช้ประโยชน์พันธุกรรมและเทคโนโลยี"
                />
              )}
              <span className="label-text">
                ใช้ประโยชน์พันธุกรรมและเทคโนโลยี
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioCategory"
                  className="radio"
                  value="ปรับปรุงพันธุ์และขยายพันธุ์"
                  readOnly={edit}
                  checked={info?.category == "ปรับปรุงพันธุ์และขยายพันธุ์"}
                />
              ) : (
                <input
                  type="radio"
                  name="radioCategory"
                  className="radio"
                  value="ปรับปรุงพันธุ์และขยายพันธุ์"
                />
              )}
              <span className="label-text">ปรับปรุงพันธุ์และขยายพันธุ์</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex cursor-pointer justify-start gap-4">
              {edit ? (
                <input
                  type="radio"
                  name="radioCategory"
                  className="radio"
                  value="อนุรักษ์สัตว์พื้นเมือง"
                  readOnly={edit}
                  checked={info?.category == "อนุรักษ์สัตว์พื้นเมือง" && edit}
                />
              ) : (
                <input
                  type="radio"
                  name="radioCategory"
                  className="radio"
                  value="อนุรักษ์สัตว์พื้นเมือง"
                />
              )}
              <span className="label-text">อนุรักษ์สัตว์พื้นเมือง</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        {!edit ? (
          <button type="submit" className="btn btn-secondary rounded-full">
            บันทึกการแก้ไข
          </button>
        ) : null}
      </div>
      {edit ? (
        <div className="flex w-full justify-between">
          <Link
            className="btn btn-secondary rounded-full"
            href={`/approvement/approve/${info?.id}?step=1`}
          >
            หน้าถัดไป
          </Link>
          <Link
            className="btn btn-neutral rounded-full"
            href="/approvement/list"
          >
            เมนูหลัก
          </Link>
        </div>
      ) : null}
    </form>
  );
};

export default ApprovementForm1;
