import { supabase } from "../db/supabaseClient.js";

export const saveHistory = async (req, res) => {
  const { url, method, headers, body, time, user_id } = req.body;

  const { data, error } = await supabase
    .from("history")
    .insert([{ url, method, headers, body, time, user_id }]);

  if (error) return res.json({ error: true, message: error.message });

  res.json({ success: true });
};

export const getHistory = async (req, res) => {
  const { user_id } = req.query;

  const { data, error } = await supabase
    .from("history")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: false });

  if (error) return res.json({ error: true, message: error.message });

  res.json(data);
};
