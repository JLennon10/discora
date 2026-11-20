begin;

create table if not exists public.artists (
  slug text primary key,
  name text not null,
  kind text not null check (kind in ('group', 'solo')),
  rank integer not null unique,
  era text not null,
  roles text not null,
  origin text not null,
  genre text not null,
  summary text not null,
  bio text not null,
  highlights text not null,
  tags text[] not null,
  image text,
  initials text not null
);

create table if not exists public.albums (
  slug text primary key,
  title text not null,
  artist_slug text not null references public.artists(slug),
  artist_name text not null,
  rank integer not null unique,
  year integer not null,
  format text not null check (format in ('Mono', 'Stereo', 'Solo')),
  catalog text not null,
  label text not null,
  track_count integer not null check (track_count > 0),
  cover text not null,
  artwork text not null,
  selection_art text,
  collection_art text,
  studio text,
  producer text,
  sides text[] not null,
  edition text not null,
  source_url text check (source_url like 'https://%')
);

create table if not exists public.tracks (
  id text primary key,
  album_slug text not null references public.albums(slug),
  title text not null,
  position integer not null check (position > 0),
  side integer not null check (side in (1, 2)),
  duration text not null check (duration ~ '^[0-9]+:[0-5][0-9]$'),
  credit text not null,
  description text,
  annotation text,
  writer text,
  writing_note text,
  source_url text check (source_url like 'https://%'),
  check (writing_note is null or source_url is not null),
  unique (album_slug, position)
);

alter table public.albums add column if not exists summary text;
alter table public.tracks add column if not exists writing_source_url text check (writing_source_url like 'https://%');

create index if not exists albums_artist_slug_idx on public.albums(artist_slug);

alter table public.artists enable row level security;
alter table public.albums enable row level security;
alter table public.tracks enable row level security;

revoke all privileges on public.artists, public.albums, public.tracks from public, anon, authenticated;
grant select on public.artists, public.albums, public.tracks to anon, authenticated;

drop policy if exists catalog_read on public.artists;
drop policy if exists catalog_read on public.albums;
drop policy if exists catalog_read on public.tracks;
create policy catalog_read on public.artists for select to anon, authenticated using (true);
create policy catalog_read on public.albums for select to anon, authenticated using (true);
create policy catalog_read on public.tracks for select to anon, authenticated using (true);

commit;
