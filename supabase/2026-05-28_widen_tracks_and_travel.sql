-- Migration: widen track set + replace hub_days with hub_travel
-- Run once in the Supabase SQL editor against the same project.
-- Assumes hub_applications table is empty (test rows already deleted).

alter table public.hub_applications
  drop constraint if exists hub_applications_hub_track_check;

alter table public.hub_applications
  add constraint hub_applications_hub_track_check
  check (hub_track in ('technical', 'security', 'responsible', 'governance', 'either'));

alter table public.hub_applications
  drop constraint if exists hub_applications_hub_days_check;

alter table public.hub_applications
  rename column hub_days to hub_travel;

alter table public.hub_applications
  add constraint hub_applications_hub_travel_check
  check (hub_travel in ('bogota', 'colombia_self', 'colombia_help', 'international'));
