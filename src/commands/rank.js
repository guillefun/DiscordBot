const { MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const { join } = require("path");

module.exports.run = async (client, message, args) => {
  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;
  const data = await client.db.get(
    `level-${message.guild.id}-${message.author.id}`
  );

  if (!data) {return message.reply("no rank")};

  const canvas = createCanvas(1280, 720);

  const ctx = canvas.getContext("2d");
  const url_background = await client.db.get(
    `banner-${message.guild.id}-${message.author.id}`
  );
  var background = "";
  
  if (!url_background){
    try{
    background = await loadImage(
      "https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-auto-show-board-background-material-image_162844.jpg"
    );
    }catch(err){
      else background = await loadImage(url_background);
    }}
  else background = await loadImage(url_background);
  if (background) {ctx.drawImage(background, 0, 0, canvas.width, canvas.height)};

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffffff";
  ctx.globalAlpha = 0.5;
  ctx.fillRect(180, 596, 770, 65);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeRect(180, 596, 770, 65);
  ctx.stroke();

  ctx.fillStyle = "#e67e22";
  ctx.globalAlpha = 0.6;
  ctx.fillRect(180, 596, (100 / (data.level * 40)) * data.xp * 7.7, 65);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#000000";
  ctx.globalAlpha = 0.6;
  ctx.fillRect(258, 450, 270, 143);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeRect(258, 450, 270, 143);
  ctx.stroke();

  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${data.xp} / ${data.level * 40} XP `, 600, 640);

  ctx.textAlign = "left";
  ctx.fillText(member.user.tag, 300, 500);

  ctx.font = "50px Arial";
  ctx.fillText("Level:", 300, 560);
  ctx.fillText(data.level, 470, 560);

  ctx.arc(170, 530, 130, 0, Math.PI * 2, true);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  ctx.closePath();
  ctx.clip();

  const avatar = await loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 40, 400, 265, 265);

  const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png");
  message.channel.send(`Rank | **${member.user.username}**`, attachment);
  /*
    message.channel.send(new MessageEmbed()
        .setAuthor(`Rank | ${member.user.tag}`)
        .setColor("#3caf50")
        .addField("XP: ", data.xp, true)
        .addField("Level: ", data.level, true)
    );*/
};

module.exports.help = {
  name: "rank",
  description: "View rank",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 6e4,
};
