// src/services/faceFusionApi.ts
import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_FACEFUSION_API_URL ?? "http://localhost:8000",
  timeout: 600_000, // 对于长视频，最长等待 10 分钟
});

export async function swapFace(source: File, target: File): Promise<Blob> {
  const formData = new FormData();
  formData.append("source", source);
  formData.append("target", target);

  const response = await client.post<Blob>("/swap", formData, {
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}