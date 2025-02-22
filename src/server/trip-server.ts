import { api } from "./api";

export type TripDetails = {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
};

type TripCreate = Omit<TripDetails, "id" | "is_confirmed"> & {
  emails_to_invite: string[];
};

async function getById(id: string) {
  try {
    const { data } = await api.get<{ trip: TripDetails }>(`/trips/${id}`);
    return data.trip;
  } catch (error) {
    throw error;
  }
}

async function create({
  ends_at,
  starts_at,
  destination,
  emails_to_invite,
}: TripCreate) {
  try {
    const { data } = await api.post<{ tripId: string }>("/trips", {
      ends_at,
      starts_at,
      destination,
      emails_to_invite,
      owner_name: "Renan Rapace",
      owner_email: "renan.teste@gmail.com",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function update({
  id,
  destination,
  ends_at,
  starts_at,
}: Omit<TripDetails, "is_confirmed">) {
  try {
    await api.put(`/trips/${id}`, {
      destination,
      ends_at,
      starts_at,
    });
  } catch (error) {
    throw error;
  }
}

export const tripServer = { getById, create, update };
