import { supabase } from "../db/supabaseClient.js";

export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.json({ error: true, message: error.message });

  res.json({ success: true, user: data.user });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.json({ error: true, message: error.message });

  res.json({
    success: true,
    user: data.user,
    token: data.session.access_token,
  });
};
