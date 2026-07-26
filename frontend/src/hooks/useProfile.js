import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProfile()
      .then((profileData) => {
        if (active) setProfile(profileData);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  return { profile, error };
}
