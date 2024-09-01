import { createClient } from "~/lib/supabase/server";

const baseUrl =
  "https://hzoaycvoobchqghrnhng.supabase.co/storage/v1/object/public/";

export const uploadIdCardImage = async (idCard: File, userId: string) => {
  const extension = idCard.name.split(".")[1];
  const supabase = createClient();

  try {
    const result = await supabase.storage
      .from("dev")
      .upload(`idcard/${userId}.${extension}`, idCard);
    console.log(result);
    if (result.error == null) {
      return `${baseUrl}${result.data.fullPath}`;
    }
  } catch (error) {
    console.log("upload error: ", error);
  }
};

export const uploadFarmImage = async (
  farmImage: File,
  userId: string,
  index: number,
) => {
  const extension = farmImage.name.split(".")[1];
  const supabase = createClient();

  try {
    const result = await supabase.storage
      .from("dev")
      .upload(`farm/${userId}_${index}.${extension}`, farmImage);
    console.log(result);
    if (result.error == null) {
      return `${baseUrl}${result.data.fullPath}`;
    }
  } catch (error) {
    console.log("upload error: ", error);
  }
};

export const updateFarmImage = async (
  farmImage: File,
  userId: string,
  index: number,
) => {
  const extension = farmImage.name.split(".")[1];
  const supabase = createClient();

  try {
    const result = await supabase.storage
      .from("dev")
      .upload(`farm/${userId}_${index}.${extension}`, farmImage, {
        upsert: true,
      });
    console.log(result);
    if (result.error == null) {
      return `${baseUrl}${result.data.fullPath}`;
    }
  } catch (error) {
    console.log("upload error: ", error);
  }
};

export const updateIdCardImage = async (idCard: File, userId: string) => {
  const extension = idCard.name.split(".")[1];
  const supabase = createClient();

  try {
    const result = await supabase.storage
      .from("dev")
      .upload(`idcard/${userId}.${extension}`, idCard, { upsert: true });
    console.log(result);
    if (result.error == null) {
      return `${baseUrl}${result.data.fullPath}`;
    }
  } catch (error) {
    console.log("upload error: ", error);
  }
};

export const uploadApproveImage = async (
  file: File,
  registerId: string,
  adminId: string,
  folder: string,
) => {
  const extension = file.name.split(".")[1];
  const supabase = createClient();

  try {
    const result = await supabase.storage
      .from("dev")
      .upload(`${folder}/${registerId}_${adminId}.${extension}`, file);
    console.log(result);
    if (result.error == null) {
      return `${baseUrl}${result.data.fullPath}`;
    }
  } catch (error) {
    console.log("upload error: ", error);
  }
};
