import { EmbedBuilder } from "@discordjs/builders";
import { Embed } from "discord.js";
export const postToEmbed = async(post: any) => {
    const embed = new EmbedBuilder()
        .setTitle(post.title)
        .setURL(`https://reddit.com${post.permalink}`)
        .setImage(post.url)
        .setAuthor({name:`${post.author.name}, ${post.subreddit_name_prefixed}`})
        .setFooter({ text: `👍 ${post.ups} | 💬 ${post.num_comments} | 💰 ${post.total_awards_received}` })
        .setTimestamp(post.created_utc * 1000);

    return embed;
}