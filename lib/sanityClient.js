import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "0ivb2b7o",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skf2Eq0uPDJEFgYXKffLlN7mkHjRkaMgHREPlNXfE4WTuiaq6xI5BoItT8erSK9n6HltB3HH5kesiDQakDdUUIECEiQpAgWf25ky2s5FysTvOJcQ2YNhvRFZ9eLomju0mEchmTJhSA2SbUGL7myUztBCL1XGJ2PwxPzha0tn6AeW3u8i3CzV",
  useCdn: false,
});
