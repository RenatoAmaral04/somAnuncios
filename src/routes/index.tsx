import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  MapPin,
  Menu,
  Mic2,
  Sparkles,
  Users,
  Volume2,
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";

// Imagens servidas de /public/images (funcionam em qualquer hospedagem, como a Vercel).
const caixasReais = { url: "/images/caixas-reais.webp" };
const caixasLed = { url: "/images/caixas-led.webp" };
const mesaSom = { url: "/images/mesa-som.webp" };
const lapelas = { url: "/images/microfones-lapela.webp" };
const microfones = { url: "/images/microfones-sem-fio.webp" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sonorização profissional para eventos em São Paulo e Barueri" },
      { name: "description", content: "Estrutura de áudio para eventos corporativos, palestras, treinamentos e confraternizações em São Paulo e Barueri. Pacotes a partir de R$450." },
      { property: "og:title", content: "Sonorização profissional para eventos" },
      { property: "og:description", content: "Áudio profissional, operação precisa e estrutura para o seu evento em São Paulo e Barueri." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "5511966495818";
const WHATSAPP_DISPLAY = "(11) 96649-5818";
const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vi o anúncio de sonorização para eventos e gostaria de consultar a disponibilidade e o orçamento.";

function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Evento de conversão: use "whatsapp_click" como conversão no Google Ads / GA4.
function trackWhatsApp(source: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "whatsapp_click", { source });
  window.dataLayer?.push({ event: "whatsapp_click", source });
}

const events = [
  [Building2, "Eventos corporativos"],
  [Mic2, "Palestras"],
  [Users, "Treinamentos"],
  [Sparkles, "Workshops"],
  [Volume2, "Confraternizações"],
  [CalendarDays, "Eventos sociais"],
] as const;

const equipment = [
  { image: caixasReais.url, title: "Caixas de som", text: "2 caixas de som para compor a estrutura principal de áudio.", tag: "Estrutura principal" },
  { image: mesaSom.url, title: "Mesa de som", text: "Controle e organização dos canais de áudio.", tag: "Controle preciso" },
  { image: microfones.url, title: "Microfones", text: "Para apresentações, palestras e condução do evento.", tag: "Sem fio" },
  { image: lapelas.url, title: "Microfones de lapela", text: "Mais liberdade para palestrantes e apresentadores.", tag: "Mobilidade" },
] as const;

const faqs = [
  ["Qual o valor?", "O pacote inicial é a partir de R$450 para até 4 horas."],
  ["Vocês atendem empresas?", "Sim. O serviço pode atender palestras, treinamentos, workshops, reuniões e eventos corporativos."],
  ["Vocês atendem Alphaville?", "Sim, consulte a disponibilidade para sua data e local."],
  ["Vocês fazem montagem?", "As condições de montagem devem ser consultadas conforme o evento."],
  ["Posso contratar somente o equipamento?", "Consulte as condições disponíveis para o seu evento."],
] as const;

function Index() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Olá! Gostaria de consultar a disponibilidade para meu evento.",
      "",
      `Nome: ${data.get("nome") ?? ""}`,
      `WhatsApp do cliente: ${data.get("whatsapp") ?? ""}`,
      `Evento: ${data.get("evento") ?? ""}`,
      `Data: ${data.get("data") ?? ""}`,
      `Local: ${data.get("local") ?? ""}`,
      `Quantidade de pessoas: ${data.get("pessoas") ?? ""}`,
      `Horário: ${data.get("horario") ?? ""}`,
      `Necessidades: ${data.get("necessidades") ?? ""}`,
      "",
      "Vi o anúncio de sonorização para eventos a partir de R$450.",
    ].join("\n");
    navigator.clipboard?.writeText(message).catch(() => {});
    trackWhatsApp("formulario");
    const url = whatsappUrl(message);
    if (!window.open(url, "_blank")) window.location.href = url;
    const status = event.currentTarget.querySelector<HTMLElement>("[data-form-status]");
    status?.removeAttribute("hidden");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Voltar ao início">
            <span className="grid size-9 place-items-center border border-primary/50 bg-primary/10 text-primary"><Volume2 className="size-5" /></span>
            <span className="font-display text-sm font-semibold uppercase tracking-[0.16em]">Áudio <span className="text-primary">Evento</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground lg:flex" aria-label="Navegação principal">
            <a className="nav-link" href="#estrutura">Estrutura</a><a className="nav-link" href="#eventos">Eventos</a><a className="nav-link" href="#processo">Como funciona</a><a className="nav-link" href="#faq">FAQ</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex"><WhatsAppLink source="header" className="cta-whatsapp"><WhatsAppIcon className="size-5" /> WhatsApp</WhatsAppLink><a href="#contato" className="cta">Consultar disponibilidade <ArrowRight className="size-4" /></a></div>
          <details className="relative lg:hidden"><summary className="grid size-11 cursor-pointer list-none place-items-center border border-border text-foreground" aria-label="Abrir menu"><Menu /></summary><nav className="absolute right-0 top-14 w-56 border border-border bg-background p-5 shadow-amber"><div className="flex flex-col gap-5 text-sm uppercase tracking-[0.12em]"><a href="#estrutura">Estrutura</a><a href="#eventos">Eventos</a><a href="#processo">Como funciona</a><a href="#faq">FAQ</a></div></nav></details>
        </div>
      </header>

      <section id="inicio" className="relative min-h-[94svh] overflow-hidden border-b border-border">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="hero-glow absolute inset-0" />
        <div className="mx-auto grid min-h-[94svh] max-w-7xl items-center gap-8 px-5 pb-20 pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="relative z-10 max-w-2xl animate-enter">
            <div className="eyebrow"><span className="status-dot" /> Sonorização para eventos</div>
            <h1 className="mt-7 font-display text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">Seu evento<br />merece ser<br /><span className="text-primary">ouvido.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Equipamentos de áudio para eventos corporativos, palestras, treinamentos, workshops e confraternizações em São Paulo e Barueri.</p>
            <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row"><WhatsAppLink source="hero" className="cta-whatsapp"><WhatsAppIcon className="size-5" /> Chamar no WhatsApp</WhatsAppLink><a href="#contato" className="cta">Consultar disponibilidade <ArrowRight className="size-4" /></a><a href="#estrutura" className="cta-secondary">Ver estrutura <ArrowDown className="size-4" /></a></div>
            <div className="mt-10 flex items-end gap-4 border-l border-primary/60 pl-4"><span className="font-display text-3xl font-semibold">R$450</span><span className="pb-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">a partir de · até 4 horas</span></div>
          </div>
          <div className="relative min-h-[48vh] animate-enter-delayed lg:min-h-[72vh]">
            <div className="sound-rings absolute inset-0 m-auto aspect-square w-[88%] rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={caixasLed.url} alt="Duas caixas de som profissionais com iluminação" className="hero-product h-[68vh] max-h-[720px] w-[78%] object-cover object-center" />
            </div>
            <div className="absolute bottom-5 right-0 border border-border bg-card/80 px-4 py-3 backdrop-blur-md"><span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Estrutura de áudio</span><span className="mt-1 block text-sm font-medium">Potência com precisão</span></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground lg:flex"><span>Explore</span><span className="h-12 w-px bg-gradient-to-b from-primary to-transparent" /></div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32"><Waveform /><div className="relative mx-auto max-w-7xl px-5 lg:px-8"><p className="eyebrow">O áudio muda tudo</p><h2 className="mt-7 max-w-5xl font-display text-4xl font-medium leading-tight sm:text-6xl lg:text-7xl">Não é apenas som.<br /><span className="text-muted-foreground">É a experiência do seu evento.</span></h2></div></section>

      <section id="eventos" className="border-y border-border bg-surface py-24 sm:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle kicker="Onde atuamos" title="Clareza para cada momento." text="Estruturas pensadas para comunicação, conteúdo e experiência — do primeiro microfone ao encerramento." /><div className="mt-14 grid grid-cols-2 border-l border-t border-border lg:grid-cols-3">{events.map(([Icon, label], i) => <div key={label} className="event-cell group"><div className="mb-10 flex items-start justify-between"><Icon className="size-6 text-primary transition-transform duration-300 group-hover:scale-110" /><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="max-w-[12rem] font-display text-lg font-medium sm:text-xl">{label}</h3></div>)}</div></div></section>

      <section id="estrutura" className="py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle kicker="Nossa estrutura" title="A estrutura por trás do som." text="Equipamentos apresentados com transparência para você saber o que compõe a experiência." /><div className="mt-14 grid gap-px bg-border lg:grid-cols-2">{equipment.map((item, i) => <article key={item.title} className="group bg-background"><div className="relative aspect-[4/3] overflow-hidden"><img src={item.image} alt={item.title} loading={i > 1 ? "lazy" : "eager"} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" /><div className="image-shade absolute inset-0" /><span className="absolute left-5 top-5 border border-foreground/20 bg-background/75 px-3 py-2 text-[10px] uppercase tracking-[0.15em] backdrop-blur-md">{item.tag}</span><span className="absolute bottom-5 right-5 font-mono text-xs text-primary">0{i + 1}</span></div><div className="flex items-start justify-between gap-4 p-6 sm:p-8"><div><h3 className="font-display text-2xl font-medium">{item.title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{item.text}</p></div><ArrowRight className="mt-1 size-5 text-primary transition-transform group-hover:translate-x-1" /></div></article>)}</div></div></section>

      <section className="border-y border-border bg-surface py-24"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8"><div><p className="eyebrow">Pacote inicial</p><h2 className="mt-6 font-display text-4xl font-medium sm:text-6xl">Comece com uma<br />estrutura profissional.</h2><p className="mt-6 max-w-xl text-muted-foreground">Uma base objetiva para seu evento, com os elementos essenciais de áudio.</p></div><div className="price-panel"><div className="flex items-end gap-3"><span className="font-display text-7xl font-semibold text-primary sm:text-8xl">R$450</span><span className="pb-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">até 4 horas</span></div><div className="my-8 h-px bg-border" /><ul className="space-y-4">{["2 caixas de som", "Mesa de som", "Microfone", "Microfone de lapela", "Estrutura adequada ao evento"].map((item) => <li className="flex items-center gap-3 text-sm" key={item}><span className="grid size-5 place-items-center border border-primary/40 text-primary"><Check className="size-3" /></span>{item}</li>)}</ul><a href="#contato" className="cta mt-9 w-full">Consultar disponibilidade <ArrowRight className="size-4" /></a><WhatsAppLink source="preco" className="cta-whatsapp mt-3 w-full"><WhatsAppIcon className="size-5" /> Pedir orçamento no WhatsApp</WhatsAppLink><p className="mt-5 text-xs leading-5 text-muted-foreground">Serviços adicionais, deslocamento, montagem e necessidades específicas podem variar conforme o evento.</p></div></div></section>

      <section className="relative overflow-hidden py-24 sm:py-32"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8"><div><p className="eyebrow">Foco corporativo</p><h2 className="mt-7 font-display text-4xl font-medium leading-tight sm:text-6xl">Quando o evento precisa funcionar, <span className="text-primary">o áudio não pode ser improvisado.</span></h2><p className="mt-7 max-w-xl leading-7 text-muted-foreground">Para palestras, treinamentos, workshops e encontros corporativos, uma estrutura de áudio adequada ajuda a manter a comunicação clara e a experiência do público.</p></div><div className="relative"><div className="absolute -inset-10 bg-primary/5 blur-3xl" /><img src={microfones.url} alt="Sistema profissional de microfones sem fio" loading="lazy" className="relative aspect-[4/3] w-full object-cover grayscale-[20%]" /></div></div></section>

      <section className="border-y border-border bg-surface py-24"><div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:px-8"><div><p className="eyebrow"><MapPin className="size-3" /> Área de atendimento</p><h2 className="mt-7 font-display text-4xl font-medium sm:text-6xl">São Paulo<br /><span className="text-primary">& Barueri.</span></h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Informe o endereço durante sua solicitação para verificarmos disponibilidade e logística.</p></div><div className="relative min-h-[360px] border border-border bg-background"><div className="map-grid absolute inset-0" />{[["São Paulo","68%","70%"],["Barueri","27%","42%"],["Alphaville","35%","28%"],["Tamboré","18%","60%"]].map(([name,left,top]) => <div key={name} className="absolute" style={{left, top}}><span className="absolute -left-1.5 -top-1.5 size-3 animate-pulse rounded-full bg-primary shadow-amber" /><span className="ml-4 whitespace-nowrap text-xs font-medium">{name}</span></div>)}</div></div></section>

      <section id="processo" className="py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle kicker="Como funciona" title="Do briefing à sua data." text="Um processo simples para definir a estrutura certa sem ruído ou improviso." /><div className="mt-16 grid gap-px bg-border md:grid-cols-5">{["Você informa o evento", "Analisamos sua necessidade", "Definimos a estrutura", "Você recebe as condições", "Reserva sua data"].map((step, i) => <div className="process-step" key={step}><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-12 font-display text-lg font-medium leading-snug">{step}</h3></div>)}</div></div></section>

      <section id="contato" className="border-y border-border bg-surface py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="eyebrow">Consulta de disponibilidade</p><h2 className="mt-7 font-display text-4xl font-medium sm:text-6xl">Seu evento já tem data?</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Informe alguns detalhes. Sua mensagem ficará pronta para continuar o atendimento.</p><WhatsAppLink source="contato" className="cta-whatsapp mt-8"><WhatsAppIcon className="size-5" /> Prefere falar agora?</WhatsAppLink><p className="mt-3 text-xs text-muted-foreground">WhatsApp {WHATSAPP_DISPLAY}</p></div><form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2"><Field label="Nome" name="nome" required /><Field label="WhatsApp" name="whatsapp" type="tel" required /><SelectField label="Tipo de evento" name="evento" options={["Evento corporativo","Palestra","Treinamento","Workshop","Reunião","Confraternização","Festa","Aniversário","Outro"]} /><Field label="Data" name="data" type="date" required /><Field label="Local" name="local" required /><Field label="Quantidade de pessoas" name="pessoas" type="number" /><Field label="Horário" name="horario" type="time" /><SelectField label="Necessidades" name="necessidades" options={["Microfone","Microfone de lapela","Música ambiente","Apresentação","Outro"]} /><button type="submit" className="cta mt-2 sm:col-span-2">Consultar disponibilidade <ArrowRight className="size-4" /></button><div data-form-status hidden className="border border-primary/30 bg-primary/5 p-5 sm:col-span-2" role="status"><p className="font-medium text-primary">Mensagem pronta para envio.</p><p className="mt-1 text-sm text-muted-foreground">Abrimos o WhatsApp com os dados do seu evento. Se não abrir, a mensagem foi copiada: é só enviar para {WHATSAPP_DISPLAY}.</p></div></form></div></section>

      <section id="faq" className="py-24 sm:py-32"><div className="mx-auto max-w-4xl px-5"><p className="eyebrow">Dúvidas frequentes</p><h2 className="mt-7 font-display text-4xl font-medium sm:text-6xl">Antes de reservar.</h2><div className="mt-12 border-t border-border">{faqs.map(([question, answer]) => <details className="group border-b border-border py-1" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 font-display text-lg font-medium"><span>{question}</span><ChevronDown className="size-5 text-primary transition-transform group-open:rotate-180" /></summary><p className="max-w-2xl pb-6 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div></div></section>

      <section className="relative overflow-hidden border-t border-border py-28 sm:py-36"><div className="hero-glow absolute inset-0 opacity-70" /><Waveform /><div className="relative mx-auto max-w-4xl px-5 text-center"><p className="eyebrow justify-center">Pronto para começar?</p><h2 className="mt-7 font-display text-5xl font-semibold sm:text-7xl">Vamos colocar seu evento em cena.</h2><p className="mx-auto mt-6 max-w-xl text-muted-foreground">Consulte a disponibilidade da estrutura de áudio para sua data.</p><div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"><WhatsAppLink source="final" className="cta-whatsapp"><WhatsAppIcon className="size-5" /> Chamar no WhatsApp</WhatsAppLink><a href="#contato" className="cta">Consultar disponibilidade <ArrowRight className="size-4" /></a></div></div></section>

      <footer className="border-t border-border bg-surface pb-24 pt-8 lg:pb-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-xs uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>Áudio Evento · São Paulo e Barueri</span><span>Sonorização profissional para eventos</span><WhatsAppLink source="rodape" className="nav-link text-primary">WhatsApp {WHATSAPP_DISPLAY}</WhatsAppLink></div></footer>
      <div className="fixed inset-x-4 bottom-4 z-40 flex gap-2 lg:hidden">
        <WhatsAppLink source="barra-mobile" className="cta-whatsapp flex-[1.15] px-3 shadow-amber"><WhatsAppIcon className="size-5" /> WhatsApp</WhatsAppLink>
        <a href="#contato" className="cta flex-1 px-3 shadow-amber">Consultar data</a>
      </div>
      <WhatsAppLink source="flutuante" className="whatsapp-fab fixed bottom-6 right-6 z-40 hidden lg:inline-flex" label="Falar no WhatsApp"><WhatsAppIcon className="size-7" /><span className="whatsapp-fab-label">Fale no WhatsApp</span></WhatsAppLink>
    </main>
  );
}

function Waveform() { return <div className="waveform absolute inset-x-0 top-1/2 flex h-32 -translate-y-1/2 items-center justify-center gap-1 opacity-15" aria-hidden="true">{Array.from({ length: 80 }, (_, i) => <span key={i} style={{ height: `${Math.round(12 + Math.abs(Math.sin(i * .39)) * 76)}%`, animationDelay: `${i * -35}ms` }} />)}</div>; }
function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text: string }) { return <div className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow">{kicker}</p><h2 className="mt-7 font-display text-4xl font-medium sm:text-6xl">{title}</h2></div><p className="max-w-lg leading-7 text-muted-foreground lg:justify-self-end">{text}</p></div>; }
function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) { return <label className="field-label">{label}<input className="field" name={name} type={type} required={required} /></label>; }
function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) { return <label className="field-label">{label}<select className="field" name={name}>{options.map(option => <option key={option}>{option}</option>)}</select></label>; }

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function WhatsAppLink({ source, className, label, children }: { source: string; className?: string; label?: string; children: ReactNode }) {
  return (
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label={label} onClick={() => trackWhatsApp(source)} className={className}>
      {children}
    </a>
  );
}
