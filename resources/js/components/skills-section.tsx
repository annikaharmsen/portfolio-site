import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-fascinate text-center mb-12">Technical Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="border-terracotta">
            <CardHeader>
              <CardTitle className="font-sans text-primary">Backend Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 min-w-0">
                <Badge variant="secondary">PHP & Laravel (Advanced)</Badge>
                <Badge variant="secondary">Java & Spring Boot (Developing)</Badge>
                <Badge variant="secondary">MySQL & Database Design</Badge>
                <Badge variant="secondary">RESTful API Development</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-terracotta">
            <CardHeader>
              <CardTitle className="font-sans text-primary">Frontend Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 min-w-0">
                <Badge variant="secondary">JavaScript, HTML5, CSS3</Badge>
                <Badge variant="secondary">React.js</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">Responsive Design</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-terracotta">
            <CardHeader>
              <CardTitle className="font-sans text-primary">Tools & Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 min-w-0">
                <Badge variant="secondary">Postman</Badge>
                <Badge variant="secondary">Git</Badge>
                <Badge variant="secondary">Agile Development</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-fascinate text-center mb-12">Professional Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="border-terracotta">
              <CardHeader>
                <CardTitle className="font-sans text-lg">Multiple Roles - Tavern in the Square</CardTitle>
                <CardDescription>Framingham, MA | July 2023 - November 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Rapidly mastered diverse roles in high-volume restaurant environment, earning increased
                  responsibilities through demonstrated reliability and quick learning ability.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Key Transferable Skills:</strong>
                  </p>
                  <ul className="list-disc space-y-1 text-muted-foreground *:ml-[1rem]">
                    <li>Multitasking & Priority Management</li>
                    <li>Problem-Solving Under Pressure</li>
                    <li>Team Collaboration</li>
                    <li>Customer-Focused Mindset</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-terracotta">
              <CardHeader>
                <CardTitle className="font-sans text-lg">Barkeeper & Service - Neo Bar & Restaurant</CardTitle>
                <CardDescription>Heidelberg, Germany | December 2024 - Present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Successfully adapted to new cultural and linguistic environment while supporting a dynamic hospitality
                  team.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Key Achievements:</strong>
                  </p>
                  <ul className="list-disc space-y-1 text-muted-foreground *:ml-[1rem]">
                    <li>Cultural adaptability and language skills</li>
                    <li>Maintained service quality in team transitions</li>
                    <li>International work experience</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
