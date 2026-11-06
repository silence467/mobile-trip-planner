# Security

## Reporting

Please report security issues privately through GitHub's security advisory feature
instead of opening a public issue with exploit details.

## Secret handling

- Never commit `amap-config.js`, API keys, Supabase `service_role` keys, trip
  backups, or personal itinerary exports.
- Supabase `anon` keys are public by design. Access control must come from RLS.
- The Supabase trip secret is a capability token. Anyone who knows both the trip
  ID and the secret can edit that trip, so share it privately.
- Cloud sync uploads itinerary data only; client-side service keys are excluded.

## Deployment checklist

1. Run `supabase/schema.sql` and verify RLS is enabled.
2. Configure the deployed hostname in the AMap domain allowlist.
3. Keep the Netlify security headers enabled.
4. Rotate any credential that was ever committed to Git history before making
   the repository public.
