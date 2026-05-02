-- Dev/test seed data. Truncate-and-reseed pattern.
-- Passwords here are bcrypt hashes of 'changeme-at-least-12chars' — DEV ONLY.

TRUNCATE TABLE audit_log, sessions, contact_messages,
  events, publications, articles, media, people, topics, users
RESTART IDENTITY CASCADE;

-- Users
INSERT INTO users (id, email, password_hash, role, name) VALUES
  ('11111111-1111-1111-1111-111111111111', 'super@example.com',
   '$2b$12$DEV_ONLY_REPLACEMENT_HASH_____________________________', 'super', 'سام سوبر'),
  ('22222222-2222-2222-2222-222222222222', 'admin@example.com',
   '$2b$12$DEV_ONLY_REPLACEMENT_HASH_____________________________', 'admin', 'أليكس آدمن');

-- Media
INSERT INTO media (id, owner_id, kind, url, mime, width, height, alt) VALUES
  ('cccccccc-0001-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'image', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', 'image/jpeg', 1200, 800, 'التصميم الداخلي لمبنى حديث'),
  ('cccccccc-0002-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'image', 'https://images.unsplash.com/photo-1541872528448-c2b64d391307?auto=format&fit=crop&w=1200&q=80', 'image/jpeg', 1200, 800, 'أفق المدينة'),
  ('cccccccc-0003-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'image', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'image/jpeg', 1200, 800, 'هندسة معمارية للشركات');

-- Topics
INSERT INTO topics (id, slug, name, description, sort_order) VALUES
  ('aaaaaaaa-0001-0000-0000-000000000000', 'public-policy', 'السياسة العامة',
   'البحوث السياسية المحلية والمقارنة.', 1),
  ('aaaaaaaa-0002-0000-0000-000000000000', 'international-relations', 'العلاقات الدولية',
   'الدبلوماسية والأمن والحوكمة العالمية.', 2),
  ('aaaaaaaa-0003-0000-0000-000000000000', 'history', 'التاريخ',
   'التحليل التاريخي الذي يثري الأسئلة المعاصرة.', 3);

-- People
INSERT INTO people (id, slug, name, role, photo_url, bio_html, links) VALUES
  ('bbbbbbbb-0001-0000-0000-000000000000', 'maya-rodriguez', 'مايا رودريغيز',
   'باحث أول، العلاقات الدولية',
   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
   '<p>تبحث مايا في الحنكة النقدية ونظام ما بعد بريتون وودز. يركز عملها الأخير على التقاطع بين التجارة الدولية والأمن الجيوسياسي.</p>',
   '[{"label":"ORCID","href":"https://orcid.org/0000-0000-0000-0000"}]'::jsonb),
  ('bbbbbbbb-0002-0000-0000-000000000000', 'jordan-kim', 'جوردان كيم',
   'مدير الأبحاث، السياسة العامة',
   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
   '<p>يقود جوردان برنامج السياسة الداخلية للمنتدى، ويتخصص في القدرة على تحمل تكاليف الإسكان، والتنمية الحضرية، والإصلاح الهيكلي.</p>',
   '[]'::jsonb),
  ('bbbbbbbb-0003-0000-0000-000000000000', 'elena-vance', 'إيلينا فانس',
   'مؤرخ مقيم',
   'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
   '<p>تتخصص إيلينا في التاريخ الدبلوماسي للقرن العشرين وأصول المؤسسات الحديثة متعددة الجنسيات.</p>',
   '[]'::jsonb);

-- Articles
INSERT INTO articles (slug, title, summary, body_html, author_id, topic_id, hero_media_id, status, published_at) VALUES
  ('post-bretton-woods-monetary-order',
   'النظام النقدي بعد بريتون وودز، بعد خمسين عاماً',
   'نظرة على كيفية تطور النظام النقدي الدولي منذ عام ١٩٧١.',
   '<p>مرت أكثر من خمسين عاماً منذ أن فصلت صدمة نيكسون الاقتصاد العالمي عن معيار الذهب.</p><p>يستكشف هذا المقال تداعيات أسعار الصرف المعومة على الاقتصادات النامية والأزمات المتكررة التي تخللت العقود الخمسة الماضية.</p>',
   'bbbbbbbb-0001-0000-0000-000000000000',
   'aaaaaaaa-0002-0000-0000-000000000000',
   'cccccccc-0001-0000-0000-000000000000',
   'published', now() - interval '7 days'),
  ('housing-affordability-reform',
   'القدرة على تحمل تكاليف الإسكان: ما تقوله الأدلة',
   'توليفة من الأبحاث الحديثة حول العرض والطلب وأدوات السياسة.',
   '<p>أصبحت تكاليف الإسكان التحدي الاقتصادي الأبرز لجيل كامل في العديد من الاقتصادات المتقدمة.</p><p>من خلال فحص إصلاحات تقسيم المناطق الناجحة في العديد من البلديات، يرسم هذا التقرير مساراً لصناع السياسات الذين يسعون إلى استعادة القدرة على تحمل التكاليف دون المساس بجودة الحياة الحضرية.</p>',
   'bbbbbbbb-0002-0000-0000-000000000000',
   'aaaaaaaa-0001-0000-0000-000000000000',
   'cccccccc-0002-0000-0000-000000000000',
   'published', now() - interval '14 days'),
  ('lessons-from-the-league-of-nations',
   'دروس من عصبة الأمم للحوكمة الحديثة',
   'لماذا لا تزال إخفاقات فترة ما بين الحربين مهمة حتى اليوم.',
   '<p>في الوقت الذي تواجه فيه المؤسسات الدولية الحديثة ضغوطاً غير مسبوقة، فإن النظر إلى الوراء في انهيار عصبة الأمم يقدم دروساً واقعية.</p>',
   'bbbbbbbb-0003-0000-0000-000000000000',
   'aaaaaaaa-0003-0000-0000-000000000000',
   'cccccccc-0003-0000-0000-000000000000',
   'published', now() - interval '30 days');

-- Events
INSERT INTO events (slug, title, description, starts_at, ends_at, location, status) VALUES
  ('europe-after-the-storm-2026',
   'أوروبا بعد العاصفة: المحاضرة السنوية ٢٠٢٦',
   'المحاضرة العامة السنوية حول الأمن والاقتصاد الأوروبي. الكلمة الرئيسية من تقديم مايا رودريغيز.',
   now() + interval '30 days',
   now() + interval '30 days' + interval '2 hours',
   'عبر الإنترنت + قاعة المنتدى',
   'published'),
  ('policy-roundtable-housing',
   'مائدة مستديرة للسياسات: مستقبل الإسكان الحضري',
   'ندوة مغلقة (تبث لاحقاً) لمناقشة إصلاح تقسيم المناطق.',
   now() - interval '5 days',
   now() - interval '5 days' + interval '3 hours',
   'قاعة اجتماعات المنتدى',
   'published');
