import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getContactMessages, submitContactForm } from "./api/contactApi";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeView, setActiveView] = useState("form");
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const isDarkMode = theme === "dark";

  const fetchMessages = async () => {
    try {
      setIsLoadingMessages(true);
      const { data } = await getContactMessages();
      setMessages(data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load messages");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (activeView === "messages") {
      fetchMessages();
    }
  }, [activeView]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", theme);
  }, [theme, isDarkMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await submitContactForm(formData);
      toast.success(data.message || "Form Submitted Successfully");
      setFormData(initialForm);
      if (activeView === "messages") {
        fetchMessages();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,rgba(36,48,71,0.82),rgba(10,91,86,0.76)),url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center px-4 py-8 text-[#243047] transition-colors dark:bg-[linear-gradient(135deg,rgba(8,13,24,0.9),rgba(7,50,48,0.86)),url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80')] dark:text-[#edf6f4]">
      <button
        className="absolute right-4 top-4 z-20 min-h-11 rounded-lg bg-white/90 px-5 font-bold text-[#243047] shadow-[0_16px_45px_rgba(10,18,32,0.18)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:bg-[#101827]/90 dark:text-[#edf6f4] dark:hover:bg-[#172033] sm:right-6 sm:top-6"
        type="button"
        onClick={() => setTheme(isDarkMode ? "light" : "dark")}
        aria-label="Toggle color theme"
      >
        {isDarkMode ? "Light" : "Dark"}
      </button>

      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl flex-col justify-center gap-5 pt-14 sm:pt-0">
        <nav className="flex w-full items-center justify-center">
          <div className="flex rounded-lg bg-white/90 p-1 shadow-[0_16px_45px_rgba(10,18,32,0.2)] backdrop-blur transition-colors dark:bg-[#101827]/90">
            <button
              className={`min-h-11 rounded-md px-5 font-bold transition ${
                activeView === "form"
                  ? "bg-[#0a5b56] text-white"
                  : "text-[#243047] hover:bg-[#e7f4f1] dark:text-[#edf6f4] dark:hover:bg-white/10"
              }`}
              type="button"
              onClick={() => setActiveView("form")}
            >
              Contact Form
            </button>
            <button
              className={`min-h-11 rounded-md px-5 font-bold transition ${
                activeView === "messages"
                  ? "bg-[#0a5b56] text-white"
                  : "text-[#243047] hover:bg-[#e7f4f1] dark:text-[#edf6f4] dark:hover:bg-white/10"
              }`}
              type="button"
              onClick={() => setActiveView("messages")}
            >
              Messages
            </button>
          </div>
        </nav>

        {activeView === "form" ? (
          <section className="mx-auto grid w-full max-w-[920px] overflow-hidden rounded-lg bg-white shadow-[0_24px_70px_rgba(10,18,32,0.24)] transition-colors dark:bg-[#101827] md:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#0a5b56] p-8 text-white transition-colors dark:bg-[#062f2d] md:p-12">
              <p className="mb-4 text-xs font-bold uppercase text-[#f7c65f]">She Can Foundation</p>
              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">Contact Us</h1>
              <p className="max-w-none leading-7 text-[#e7f4f1] md:max-w-[34ch]">
                We would love to hear from you. Reach out to share your ideas,
                ask a question, volunteer, or learn how you can support our work
                in empowering women and creating meaningful change.
              </p>
            </div>

            <form className="grid gap-3 p-6 md:p-12" onSubmit={handleSubmit}>
              <label className="font-bold text-[#243047] dark:text-[#edf6f4]" htmlFor="name">
                Name
              </label>
              <input
                className="w-full rounded-lg border border-[#d6dce8] bg-white px-4 py-3 text-[#243047] outline-none transition focus:border-[#0a5b56] focus:ring-4 focus:ring-[#0a5b56]/10 dark:border-[#2d374b] dark:bg-[#172033] dark:text-[#edf6f4] dark:placeholder:text-[#8e9ab0]"
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />

              <label className="font-bold text-[#243047] dark:text-[#edf6f4]" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-lg border border-[#d6dce8] bg-white px-4 py-3 text-[#243047] outline-none transition focus:border-[#0a5b56] focus:ring-4 focus:ring-[#0a5b56]/10 dark:border-[#2d374b] dark:bg-[#172033] dark:text-[#edf6f4] dark:placeholder:text-[#8e9ab0]"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <label className="font-bold text-[#243047] dark:text-[#edf6f4]" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full resize-y rounded-lg border border-[#d6dce8] bg-white px-4 py-3 text-[#243047] outline-none transition focus:border-[#0a5b56] focus:ring-4 focus:ring-[#0a5b56]/10 dark:border-[#2d374b] dark:bg-[#172033] dark:text-[#edf6f4] dark:placeholder:text-[#8e9ab0]"
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
              />

              <button
                className="mt-2 min-h-12 rounded-lg bg-[#f7c65f] px-5 font-extrabold text-[#17312f] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(247,198,95,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </section>
        ) : (
          <section className="mx-auto w-full max-w-6xl rounded-lg bg-white/95 p-6 shadow-[0_24px_70px_rgba(10,18,32,0.24)] backdrop-blur transition-colors dark:bg-[#101827]/95 md:p-8">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase text-[#0a5b56] dark:text-[#6ed8ce]">Inbox</p>
                <h1 className="text-3xl font-bold leading-tight text-[#243047] dark:text-[#edf6f4] md:text-4xl">
                  Messages Received
                </h1>
              </div>
              <button
                className="min-h-11 rounded-lg bg-[#f7c65f] px-5 font-extrabold text-[#17312f] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                type="button"
                onClick={fetchMessages}
                disabled={isLoadingMessages}
              >
                {isLoadingMessages ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {isLoadingMessages ? (
              <div className="grid min-h-56 place-items-center rounded-lg border border-dashed border-[#c7d0df] text-lg font-bold text-[#0a5b56] dark:border-[#2d374b] dark:text-[#6ed8ce]">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="grid min-h-56 place-items-center rounded-lg border border-dashed border-[#c7d0df] text-center dark:border-[#2d374b]">
                <p className="max-w-sm text-lg font-bold text-[#243047] dark:text-[#edf6f4]">
                  No messages yet. Submit the contact form and they will appear here.
                </p>
              </div>
            ) : (
              <div className="grid max-h-[62vh] gap-4 overflow-y-auto pr-1 md:grid-cols-2">
                {messages.map((item, index) => (
                  <article
                    className="animate-[messageIn_0.45s_ease_both] rounded-lg border border-[#d6dce8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(10,18,32,0.13)] dark:border-[#2d374b] dark:bg-[#172033]"
                    key={item._id}
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-[#243047] dark:text-[#edf6f4]">{item.name}</h2>
                        <p className="break-all text-sm font-semibold text-[#0a5b56] dark:text-[#6ed8ce]">{item.email}</p>
                      </div>
                      <span className="rounded-md bg-[#e7f4f1] px-3 py-1 text-xs font-bold text-[#0a5b56] dark:bg-[#0a5b56]/30 dark:text-[#6ed8ce]">
                        New
                      </span>
                    </div>
                    <p className="leading-7 text-[#46546d] dark:text-[#c8d3e1]">{item.message}</p>
                    <p className="mt-4 text-xs font-semibold text-[#7b879b] dark:text-[#8e9ab0]">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
