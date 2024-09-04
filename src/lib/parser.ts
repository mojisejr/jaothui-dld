import { ApprovementInfo, type RawRegisterData } from "@prisma/client";
import {
  updateFarmImage,
  updateIdCardImage,
  uploadApproveImage,
  uploadFarmImage,
  uploadIdCardImage,
} from "~/actions/upload";
import { type RawFormData } from "~/interfaces/new-member";

export const formDataParser = async (formData: FormData) => {
  const userId = formData.get("userId")?.toString() ?? "N/A";

  const idCardImageUrl = await uploadIdCardImage(
    formData.get("idCardImage") as File,
    userId,
  );

  if (idCardImageUrl == null) throw Error("upload ภาพไม่ได้");

  const farmImage1Url = await uploadFarmImage(
    formData.get("farmImage1") as File,
    userId,
    1,
  );

  if (farmImage1Url == null) throw Error("upload ภาพไม่ได้");
  // const farmImage2Url = await uploadFarmImage(
  //   formData.get("farmImage2") as File,
  //   userId,
  //   2,
  // );
  // const farmImage3Url = await uploadFarmImage(
  //   formData.get("farmImage3") as File,
  //   userId,
  //   3,
  // );
  // const farmImage4Url = await uploadFarmImage(
  //   formData.get("farmImage4") as File,
  //   userId,
  //   4,
  // );
  const rawFormData: RawFormData = {
    firstname: formData.get("firstName")?.toString() ?? "N/A",
    lastname: formData.get("lastName")?.toString() ?? "N/A",
    tel: formData.get("tel")?.toString() ?? "N/A",
    idCard: parseInt(formData.get("idCard") as string) ?? 0,
    address1: formData.get("address1")?.toString() ?? "N/A",
    province: formData.get("province")?.toString() ?? "N/A",
    amphoe: formData.get("amphoe")?.toString() ?? "N/A",
    district: formData.get("district")?.toString() ?? "N/A",
    zipcode: formData.get("zipcode")?.toString() ?? "N/A",
    farmName: formData.get("farmName")?.toString() ?? "N/A",
    farmLogo: formData.get("farmLogo")?.toString() ?? "N/A",
    farmAddress: formData.get("farmAddress1")?.toString() ?? "N/A",
    farmProvince: formData.get("farmProvince")?.toString() ?? "N/A",
    farmAmphoe: formData.get("farmAmphoe")?.toString() ?? "N/A",
    farmDistrict: formData.get("farmDistrict")?.toString() ?? "N/A",
    farmZipcode: formData.get("farmZipCode")?.toString() ?? "N/A",
    farmSize1: parseInt(formData.get("farmSize1") as string) ?? 0,
    farmSize2: parseInt(formData.get("farmSize2") as string) ?? 0,
    farmSize3: parseInt(formData.get("farmSize3") as string) ?? 0,
    animalType: formData.get("animalType")?.toString() ?? "N/A",
    animalTypeOther: formData.get("animalTypeOther")?.toString() ?? "N/A",
    momCount: parseInt(formData.get("momCount") as string) ?? 0,
    momBreed: formData.get("momBread")?.toString() ?? "N/A",
    dadCount: parseInt(formData.get("dadCount") as string) ?? 0,
    dadBreed: formData.get("dadBread")?.toString() ?? "N/A",
    otherAnimalSize: parseInt(formData.get("otherAnimalSize") as string) ?? 0,
    children: parseInt(formData.get("children") as string) ?? 0,
    totalAnimalInFarm:
      parseInt(formData.get("totalAnimalInFarm") as string) ?? 0,
    farmObj1: formData.get("farmObj1")?.toString() ?? "N/A",
    farmObj2: formData.get("farmObj2")?.toString() ?? "N/A",
    farmObj3: formData.get("farmObj3")?.toString() ?? "N/A",
    farmObj4: formData.get("farmObj4")?.toString() ?? "N/A",
    farmObjOther: formData.get("farmObjOther")?.toString() ?? "N/A",
    grassField: formData.get("radioGrass")?.toString() ?? "N/A",
    water: formData.get("radioWater")?.toString() ?? "N/A",
    waterOther: formData.get("radioWaterOther")?.toString() ?? "N/A",
    food: formData.get("radioFood")?.toString() ?? "N/A",
    foodOther: formData.get("radioFordOther")?.toString() ?? "N/A",
    treat: formData.get("radioTreat")?.toString() ?? "N/A",
    treatOther: formData.get("radioTreatOther")?.toString() ?? "N/A",
    certificate: formData.get("radioCertificate")?.toString() ?? "N/A",
    waterTreat: formData.get("radioWaterTreat")?.toString() ?? "N/A",
    farmLocation: formData.get("farmLocation")?.toString() ?? "N/A",
    idCardImage: idCardImageUrl ?? "N/A",
    farmImage1: farmImage1Url ?? "N/A",
    // farmImage2: farmImage2Url ?? "N/A",
    // farmImage3: farmImage3Url ?? "N/A",
    // farmImage4: farmImage4Url ?? "N/A",
    category: formData.get("radioCategory")?.toString() ?? "N/A",
    accept: formData.get("radioAccept")?.toString() ?? "N/A",
    userId,
  };
  return rawFormData;
};

export const formUpdateDataParser = async (
  formData: FormData,
  info: RawRegisterData,
) => {
  const idCard = formData.get("idCardImage") as File;
  const idCardImageUrl =
    idCard.name == undefined || idCard.size <= 0
      ? info.idCardImage
      : await updateIdCardImage(idCard, info.userId);

  const farmImage1 = formData.get("farmImage1") as File;
  const farmImage1Url =
    farmImage1.name == undefined || farmImage1.size <= 0
      ? info.farmImage1
      : await updateFarmImage(farmImage1, info.userId, 1);

  // const farmImage2 = formData.get("farmImage2") as File;
  // const farmImage2Url =
  //   farmImage2.name == undefined || farmImage2.size <= 0
  //     ? info.farmImage2
  //     : await updateFarmImage(farmImage2, info.userId, 2);

  // const farmImage3 = formData.get("farmImage3") as File;
  // const farmImage3Url =
  //   farmImage3.name == undefined || farmImage3.size <= 0
  //     ? info.farmImage3
  //     : await updateFarmImage(farmImage3, info.userId, 3);

  // const farmImage4 = formData.get("farmImage4") as File;
  // const farmImage4Url =
  //   farmImage4.name == undefined || farmImage4.size <= 0
  //     ? info.farmImage4
  //     : await updateFarmImage(farmImage4, info.userId, 4);

  const rawFormData = {
    firstname: formData.get("firstName")?.toString() ?? "N/A",
    lastname: formData.get("lastName")?.toString() ?? "N/A",
    tel: formData.get("tel")?.toString() ?? "N/A",
    idCard: parseInt(formData.get("idCard") as string) ?? 0,
    address1: formData.get("address1")?.toString() ?? "N/A",
    province: formData.get("province")?.toString() ?? "N/A",
    amphoe: formData.get("amphoe")?.toString() ?? "N/A",
    district: formData.get("district")?.toString() ?? "N/A",
    zipcode: formData.get("zipcode")?.toString() ?? "N/A",
    farmName: formData.get("farmName")?.toString() ?? "N/A",
    farmLogo: formData.get("farmLogo")?.toString() ?? "N/A",
    farmAddress: formData.get("farmAddress1")?.toString() ?? "N/A",
    farmProvince: formData.get("farmProvince")?.toString() ?? "N/A",
    farmAmphoe: formData.get("farmAmphoe")?.toString() ?? "N/A",
    farmDistrict: formData.get("farmDistrict")?.toString() ?? "N/A",
    farmZipcode: formData.get("farmZipCode")?.toString() ?? "N/A",
    farmSize1: parseInt(formData.get("farmSize1") as string) ?? 0,
    farmSize2: parseInt(formData.get("farmSize2") as string) ?? 0,
    farmSize3: parseInt(formData.get("farmSize3") as string) ?? 0,
    animalType: formData.get("animalType")?.toString() ?? "N/A",
    animalTypeOther: formData.get("animalTypeOther")?.toString() ?? "N/A",
    momCount: parseInt(formData.get("momCount") as string) ?? 0,
    momBreed: formData.get("momBread")?.toString() ?? "N/A",
    dadCount: parseInt(formData.get("dadCount") as string) ?? 0,
    dadBreed: formData.get("dadBread")?.toString() ?? "N/A",
    otherAnimalSize: parseInt(formData.get("otherAnimalSize") as string) ?? 0,
    children: parseInt(formData.get("children") as string) ?? 0,
    totalAnimalInFarm:
      parseInt(formData.get("totalAnimalInFarm") as string) ?? 0,
    farmObj1: formData.get("farmObj1")?.toString() ?? "N/A",
    farmObj2: formData.get("farmObj2")?.toString() ?? "N/A",
    farmObj3: formData.get("farmObj3")?.toString() ?? "N/A",
    farmObj4: formData.get("farmObj4")?.toString() ?? "N/A",
    farmObjOther: formData.get("farmObjOther")?.toString() ?? "N/A",
    grassField: formData.get("radioGrass")?.toString() ?? "N/A",
    water: formData.get("radioWater")?.toString() ?? "N/A",
    waterOther: formData.get("radioWaterOther")?.toString() ?? "N/A",
    food: formData.get("radioFood")?.toString() ?? "N/A",
    foodOther: formData.get("radioFordOther")?.toString() ?? "N/A",
    treat: formData.get("radioTreat")?.toString() ?? "N/A",
    treatOther: formData.get("radioTreatOther")?.toString() ?? "N/A",
    certificate: formData.get("radioCertificate")?.toString() ?? "N/A",
    waterTreat: formData.get("radioWaterTreat")?.toString() ?? "N/A",
    farmLocation: formData.get("farmLocation")?.toString() ?? "N/A",
    idCardImage: idCardImageUrl ?? "N/A",
    farmImage1: farmImage1Url ?? "N/A",
    // farmImage2: farmImage2Url ?? "N/A",
    // farmImage3: farmImage3Url ?? "N/A",
    // farmImage4: farmImage4Url ?? "N/A",
    category: formData.get("radioCategory")?.toString() ?? "N/A",
    accept: formData.get("radioAccept")?.toString() ?? "N/A",
  };
  return rawFormData;
};

export const memberApprovementParser = async (
  formData: FormData,
  registerId: string,
  adminId: string,
) => {
  //uploading zone
  const grassImage1 = await uploadApproveImage(
    formData.get("grassImage1") as File,
    registerId,
    adminId,
    "grass",
  );

  if (grassImage1 == null) throw Error("uplaod grass ไม่ได้");

  // const grassImage2 = await uploadApproveImage(
  //   formData.get("grassImage2") as File,
  //   registerId,
  //   adminId,
  //   "grass",
  // );

  // const grassImage3 = await uploadApproveImage(
  //   formData.get("grassImage3") as File,
  //   registerId,
  //   adminId,
  //   "grass",
  // );

  const waterImage1 = await uploadApproveImage(
    formData.get("waterImage1") as File,
    registerId,
    adminId,
    "water",
  );

  if (waterImage1 == null) throw Error("upload water ไม่ได้");

  // const waterImage2 = await uploadApproveImage(
  //   formData.get("waterImage2") as File,
  //   registerId,
  //   adminId,
  //   "water",
  // );

  const foodImage1 = await uploadApproveImage(
    formData.get("foodImage1") as File,
    registerId,
    adminId,
    "food",
  );

  if (foodImage1 == null) throw Error("upload food ไม่ได้");

  // const foodImage2 = await uploadApproveImage(
  //   formData.get("foodImage2") as File,
  //   registerId,
  //   adminId,
  //   "food",
  // );

  const treatImage1 = await uploadApproveImage(
    formData.get("treatImage1") as File,
    registerId,
    adminId,
    "treat",
  );

  if (treatImage1 == null) throw Error("upload treat ไม่ได้");

  // const treatImage2 = await uploadApproveImage(
  //   formData.get("treatImage2") as File,
  //   registerId,
  //   adminId,
  //   "treat",
  // );

  // const treatImage3 = await uploadApproveImage(
  //   formData.get("treatImage3") as File,
  //   registerId,
  //   adminId,
  //   "treat",
  // );

  const wasteImage1 = await uploadApproveImage(
    formData.get("wasteImage1") as File,
    registerId,
    adminId,
    "waste",
  );

  if (wasteImage1 == null) throw Error("upload waste ไม่ได้");

  // const wasteImage2 = await uploadApproveImage(
  //   formData.get("wasteImage2") as File,
  //   registerId,
  //   adminId,
  //   "waste",
  // );

  const parsedData = {
    grassImage1: grassImage1 ?? "N/A",
    // grassImage2: grassImage2 ?? "N/A",
    // grassImage3: grassImage3 ?? "N/A",
    feedingBowl: formData.get("feedingBowl") as string,
    feedingBowlOther: formData.get("feedingBowlOther") as string,
    greenhouse: formData.get("greenhouse") as string,
    greenhouseOther: formData.get("greenhouseOther") as string,
    waterBowl: formData.get("waterBowl") as string,
    waterBowlOther: formData.get("waterBowlOther") as string,
    waterImage1: waterImage1 ?? "N/A",
    // waterImage2: waterImage2 ?? "N/A",
    foodImage1: foodImage1 ?? "N/A",
    // foodImage2: foodImage2 ?? "N/A",
    treatImage1: treatImage1 ?? "N/A",
    // treatImage2: treatImage2 ?? "N/A",
    // treatImage3: treatImage3 ?? "N/A",
    wasteImage1: wasteImage1 ?? "N/A",
    // wasteImage2: wasteImage2 ?? "N/A",
    tag: formData.get("tag") as string,
    certificate: formData.get("certificate") as string,
    product: formData.get("product") as string,
    health: formData.get("health") as string,
    foodManagement: formData.get("foodManagement") as string,
    market: formData.get("market") as string,
    result: formData.get("result") as string,
    note: formData.get("note") as string,
    rawRegisterDataId: registerId,
    provinceApproved: [],
    centralApproved: null,
    managementApproved: null,
  };

  return parsedData;
};
