const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (
    !["797431497778528257"].some(role =>
      message.member.roles.cache.get(role)
    ) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      `Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`
    );

  const erkek = message.guild.roles.cache.find(
    r => r.id === "797433124006789140"
  );
  const xy = message.guild.roles.cache.find(r => r.id === "797433124006789140");
  const kayıtsız = message.guild.roles.cache.find(
    r => r.id === "797434542180270110"
  );
  const reglog = message.guild.channels.cache.find(
    c => c.id === "818085313141669899"
  );
  const genelchat = message.guild.channels.cache.find(
    g => g.id === "810778906097483796"
  );

  const member = message.guild.member(
    message.mentions.members.first() || message.guild.members.cache.get(args[0])
  );
  if (!member) return message.channel.send(`Bir Kullanıcı Belirt.`);
  if (!member.roles.highest.position >= message.member.roles.highest.position)
    return message.channel.send(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`);
  const x = message.guild.member(member);

  let tag = "₪";
  let isim = args[1];
  let yas = Number(args[2]);
  if (!isim) return message.channel.send(`Bir İsim Belirt`);
  if (!yas) return message.channel.send(`Bir Yaş Belirt`);

  let bilgi = db.get(`yetkili.${member.id}`);
  db.add(`yetkili.${message.author.id}.erkek`, 1);
  db.add(`yetkili.${message.author.id}.toplam`, 1);
  let toplami = db.fetch(`yetkili.${message.author.id}.toplam`);

  message.react("✅");
  message.channel.send("Başarılı!");
  x.setNickname(`${tag} ${isim} ${yas}`);
  x.roles.add(erkek);
  x.roles.add(xy);
  x.roles.remove(kayıtsız);
  //
  x.setNickname(`${tag} ${isim} | ${yas}`);
  x.roles.add(erkek);
  x.roles.add(xy);
  x.roles.remove(kayıtsız);

  genelchat.send(
    `<@${member.id}>, Aramıza Hoş Geldin ! Umarım Keyifli Vakitler Geçirirsin.`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["member", "teyit", "kayıtla"],
  permLevel: 0
};

exports.help = {
  name: "kayıt"
};
