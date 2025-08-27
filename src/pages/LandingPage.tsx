import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">CrimsonBeats</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Xin chào, tôi là Trần Hoàng Phi, Front-end Developer.</h2>
        <p className="max-w-2xl text-lg text-muted-foreground mb-8">
          Đây là dự án cá nhân tôi xây dựng để thể hiện kỹ năng làm việc với React, TypeScript, và tích hợp API từ YouTube. Ứng dụng cho phép bạn tìm kiếm và nghe nhạc trực tiếp từ YouTube với một giao diện độc đáo.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link to="/login">Đăng nhập</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/signup">Đăng ký</Link>
          </Button>
        </div>
      </div>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        © 2025 Marc (Trần Hoàng Phi)
      </footer>
    </div>
  );
};

export default LandingPage;