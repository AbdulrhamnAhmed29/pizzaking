import { useLogin } from '../hooks/useAuth';
import SignInForm from './SignInForm'
import { ChefHat } from 'lucide-react'

const SignIn = () => {
    const loginMutation = useLogin();
  return (
    // الخلفية: تدرج رمادي غامق جداً مع تأثير شعاعي (radial) في المنتصف
    <div className="relative min-h-screen bg-[#0a0a0a] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden" dir="rtl">
      
      {/* عناصر زينة للخلفية (توهج ذهبي ناعم) */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          {/* الأيقونة: دائرية بخلفية ذهبية داكنة وأيقونة بيضاء */}
          <div className="mx-auto h-20 w-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <ChefHat className="h-10 w-10 text-black" />
          </div>
          
          {/* العنوان: ذهبي متدرج فخم */}
          <h2 className="mt-8 text-4xl font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#FBF089] to-[#D4AF37] bg-clip-text text-transparent">
            لوحة تحكم منيو بيتزا كينج 
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            سجل دخولك لإدارة إمبراطورية مطعمك
          </p>
        </div>

        {/* حاوية النموذج: أسود داكن جداً، شبه شفاف، مع حد ذهبي نحيف للغاية وتوهج ناعم */}
        <div className="bg-[#111111]/80 backdrop-blur-sm py-10 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-2xl border border-[#D4AF37]/10">
          <SignInForm
            loginMutation={loginMutation}
           />
        </div>

      </div>
    </div>
  )
}

export default SignIn