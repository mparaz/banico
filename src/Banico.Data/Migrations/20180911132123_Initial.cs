using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Banico.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    LastUpdate = table.Column<DateTimeOffset>(nullable: false),
                    Tenant = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Alias = table.Column<string>(nullable: true),
                    Module = table.Column<string>(nullable: true),
                    ParentId = table.Column<Guid>(nullable: false),
                    SectionItems = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    Attribute01 = table.Column<string>(nullable: true),
                    Attribute02 = table.Column<string>(nullable: true),
                    Attribute03 = table.Column<string>(nullable: true),
                    Attribute04 = table.Column<string>(nullable: true),
                    Attribute05 = table.Column<string>(nullable: true),
                    Attribute06 = table.Column<string>(nullable: true),
                    Attribute07 = table.Column<string>(nullable: true),
                    Attribute08 = table.Column<string>(nullable: true),
                    Attribute09 = table.Column<string>(nullable: true),
                    Attribute10 = table.Column<string>(nullable: true),
                    Attribute11 = table.Column<string>(nullable: true),
                    Attribute12 = table.Column<string>(nullable: true),
                    Attribute13 = table.Column<string>(nullable: true),
                    Attribute14 = table.Column<string>(nullable: true),
                    Attribute15 = table.Column<string>(nullable: true),
                    Attribute16 = table.Column<string>(nullable: true),
                    Attribute17 = table.Column<string>(nullable: true),
                    Attribute18 = table.Column<string>(nullable: true),
                    Attribute19 = table.Column<string>(nullable: true),
                    Attribute20 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Invites",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Inviter = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SectionItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    LastUpdate = table.Column<DateTimeOffset>(nullable: false),
                    Tenant = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    ParentId = table.Column<Guid>(nullable: false),
                    Section = table.Column<string>(nullable: true),
                    PathUrl = table.Column<string>(nullable: true),
                    PathName = table.Column<string>(nullable: true),
                    Alias = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SectionItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    LastUpdate = table.Column<DateTimeOffset>(nullable: false),
                    Tenant = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Modules = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    EntryTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentItems");

            migrationBuilder.DropTable(
                name: "Invites");

            migrationBuilder.DropTable(
                name: "SectionItems");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
