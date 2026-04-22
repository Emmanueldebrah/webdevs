import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedDatabase() {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.error('DATABASE_URL not set');
      process.exit(1);
    }

    const url = new URL(dbUrl);
    const connection = await mysql.createConnection({
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      ssl: { rejectUnauthorized: false }
    });

    console.log('Connected to database. Seeding with sample content...\n');

    // Seed News
    const newsData = [
      {
        title: "MTN Commissions Ultra-Modern Library at Ebenezer SHS",
        excerpt: "MTN Ghana Foundation commissioned an ultra-modern multi-purpose library for the school.",
        content: "MTN Ghana through its Foundation on Tuesday, November 24, 2020 commissioned an ultra-modern multi-purpose library for the Ebenezer Senior High School that would also serve the Dansoman community. The library is equipped with modern facilities and resources to enhance learning.",
        published: true
      },
      {
        title: "School Celebrates 80th Anniversary",
        excerpt: "Ebenezer SHS marks 80 years of educational excellence with a grand celebration.",
        content: "The school celebrated its 80th anniversary with a special event featuring speeches, performances, and recognition of outstanding students and staff. The celebration highlighted the school's journey from its humble beginnings in 1941 to becoming a premier educational institution.",
        published: true
      },
      {
        title: "New Science Laboratory Opened",
        excerpt: "State-of-the-art science laboratory opens for students.",
        content: "The newly renovated science laboratory has been equipped with modern equipment to provide students with hands-on learning experiences in biology, chemistry, and physics. The laboratory will enhance practical learning and scientific inquiry.",
        published: true
      }
    ];

    for (const news of newsData) {
      await connection.execute(
        'INSERT INTO news (title, excerpt, content, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [news.title, news.excerpt, news.content, news.published]
      );
      console.log(`✓ Added news: ${news.title}`);
    }

    // Seed Events
    const eventsData = [
      {
        title: "Speech and Prize-Giving Day",
        description: "Annual celebration of academic and co-curricular achievements. Students will be recognized for their outstanding performance in academics, sports, and other activities.",
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: "School Auditorium",
        published: true
      },
      {
        title: "Sports Day",
        description: "Inter-house athletic competition featuring track and field events, relays, and team sports. All students are encouraged to participate.",
        eventDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        location: "School Sports Field",
        published: true
      },
      {
        title: "Career Fair",
        description: "Meet professionals from various fields and learn about different career paths. Industry experts will share insights and advice.",
        eventDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        location: "School Grounds",
        published: true
      }
    ];

    for (const event of eventsData) {
      await connection.execute(
        'INSERT INTO events (title, description, eventDate, location, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [event.title, event.description, event.eventDate, event.location, event.published]
      );
      console.log(`✓ Added event: ${event.title}`);
    }

    // Seed Staff
    const staffData = [
      {
        name: "Dr. Samuel Mensah",
        position: "Headmaster",
        department: "Administration",
        email: "s.mensah@ebenezer-shs.edu.gh",
        phone: "+233 30 298 6227",
        bio: "Experienced educator with over 20 years in secondary education.",
        published: true
      },
      {
        name: "Mrs. Abigail Owusu",
        position: "Vice Headmaster (Academic)",
        department: "Administration",
        email: "a.owusu@ebenezer-shs.edu.gh",
        phone: "+233 55 965 1014",
        bio: "Dedicated to academic excellence and student development.",
        published: true
      },
      {
        name: "Mr. Joseph Afful Bedu",
        position: "Head of Science Department",
        department: "Science",
        email: "j.bedu@ebenezer-shs.edu.gh",
        phone: "+233 24 123 4567",
        bio: "Passionate about practical science education.",
        published: true
      },
      {
        name: "Ms. Grace Yeboah",
        position: "Head of Languages Department",
        department: "Languages",
        email: "g.yeboah@ebenezer-shs.edu.gh",
        phone: "+233 26 789 0123",
        bio: "Promotes multilingual competence and cultural awareness.",
        published: true
      },
      {
        name: "Mr. Kwame Boateng",
        position: "Head of Sports",
        department: "Physical Education",
        email: "k.boateng@ebenezer-shs.edu.gh",
        phone: "+233 27 456 7890",
        bio: "Develops athletic excellence and team spirit.",
        published: true
      }
    ];

    for (const member of staffData) {
      await connection.execute(
        'INSERT INTO staff (name, position, department, email, phone, bio, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [member.name, member.position, member.department, member.email, member.phone, member.bio, member.published]
      );
      console.log(`✓ Added staff: ${member.name}`);
    }

    // Seed Gallery
    const galleryData = [
      {
        title: "Campus Main Gate",
        description: "The iconic entrance to Ebenezer Senior High School.",
        imageUrl: "https://via.placeholder.com/400x300?text=Campus+Gate",
        category: "campus-life",
        published: true
      },
      {
        title: "Library Building",
        description: "State-of-the-art library facility commissioned by MTN Ghana.",
        imageUrl: "https://via.placeholder.com/400x300?text=Library",
        category: "campus-life",
        published: true
      },
      {
        title: "Annual Sports Day",
        description: "Students compete in various athletic events.",
        imageUrl: "https://via.placeholder.com/400x300?text=Sports+Day",
        category: "events",
        published: true
      },
      {
        title: "Prize-Giving Ceremony",
        description: "Recognition of outstanding student achievements.",
        imageUrl: "https://via.placeholder.com/400x300?text=Prize+Giving",
        category: "events",
        published: true
      },
      {
        title: "Drama Club Performance",
        description: "Students showcase their theatrical talents.",
        imageUrl: "https://via.placeholder.com/400x300?text=Drama+Club",
        category: "extracurricular",
        published: true
      },
      {
        title: "Music Ensemble",
        description: "School choir and musical performances.",
        imageUrl: "https://via.placeholder.com/400x300?text=Music",
        category: "extracurricular",
        published: true
      }
    ];

    for (const item of galleryData) {
      await connection.execute(
        'INSERT INTO gallery (title, description, imageUrl, category, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [item.title, item.description, item.imageUrl, item.category, item.published]
      );
      console.log(`✓ Added gallery: ${item.title}`);
    }

    await connection.end();
    console.log('\n✓ Database seeding completed successfully!');
  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
