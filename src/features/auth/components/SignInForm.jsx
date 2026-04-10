import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLogin } from '../hooks/useAuth'
import { Eye, EyeOff, Mail, Lock, AlertTriangle, Loader2 } from 'lucide-react'
import { useState } from 'react'

const schema = yup.object({
  identifier: yup
    .string()
    .required('البريد الإلكتروني مطلوب ')
    .email('تنسيق البريد الإلكتروني غير صحيح'),
  password: yup
    .string()
    .required('كلمة المرور مطلوبة ')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
})

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-right">
      {/* حقل البريد الإلكتروني */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300 mr-1">
          البريد الإلكتروني 
        </label>
        <div className="relative">
          <input
            {...register('identifier')}
            type="email"
            // تصميم الحقل: داكن، حدود نحيفة غامقة، تتوهج بالذهبي عند الفوكس، مع padding لليمين للأيقونة
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-zinc-100 placeholder:text-zinc-600 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] pr-12 transition-all duration-300"
            placeholder="admin@pizzaking.com"
          />
          <Mail className="absolute right-4 top-4 h-5 w-5 text-zinc-600" />
        </div>
        {errors.identifier && (
          <p className="mt-1 text-xs text-red-400 mr-1">{errors.identifier.message}</p>
        )}
      </div>

      {/* حقل كلمة المرور */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300 mr-1">
          كلمة المرور السرية
        </label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-zinc-100 placeholder:text-zinc-600 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] pr-12 transition-all duration-300"
            placeholder="••••••••"
          />
          {/* زر إظهار/إخفاء الباسورد */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-4 text-zinc-600 hover:text-[#D4AF37] transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          <Lock className="absolute right-4 top-4 h-5 w-5 text-zinc-600" />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400 mr-1">{errors.password.message}</p>
        )}
      </div>

      {/* الزر الرئيسي: تدرج ذهبي فخم (Gradient) مع تأثير hover يقلب التدرج، وتوهج سفلي (Shadow) */}
      <button
        type="submit"
        disabled={loginMutation.isLoading}
        className="w-full group relative flex justify-center items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#AA8A2E] via-[#D4AF37] to-[#AA8A2E] py-4 px-6 text-sm font-bold text-black shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
      >
        {/* طبقة بيضاء خفيفة تظهر عند الـ Hover لتعطي لمعاناً */}
        <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
        
        {loginMutation.isLoading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>جاري فتح البوابة لوحه التحكم ...</span>
          </>
        ) : (
          <span className="relative z-10"> تسجيل دخول  </span>
        )}
      </button>

      {/* رسالة الخطأ: تصميم داكن بلمسة حمراء */}
      {loginMutation.isError && (
        <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-center gap-3 mt-4">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">
            يبدو أن العبور مرفوض. يرجى التحقق من بياناتك .
          </p>
        </div>
      )}
    </form>
  )
}

export default SignInForm